import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo'
import TodoEditForm from './TodoEditForm'

function TodoList({ todos, deleteTodo, toggleTodo, updateTodos }) {
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks')
      console.log(response)
    } catch (error) {
      console.error('Error fetching tasks', error)
      setError('Error fetching tasks. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const startEditingTodo = (id) => {
    setEditingTodoId(id)
  }

  const cancelEditingTodo = () => {
    setEditingTodoId(null)
  }

  const saveEditedTodo = async (editedTodo) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/tasks/${editedTodo._id}`,
        editedTodo
      )
      setEditingTodoId(null)
    } catch (error) {
      console.error('Error saving edited task', error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
<div>
      {!todos.length && <h2>Todo list is empty</h2>}
      {todos.map((todo) => (
        <div
          key={todo._id}
        >
          {editingTodoId === todo._id ? (
            <TodoEditForm
              todo={todo}
              onSave={saveEditedTodo}
              onCancel={cancelEditingTodo}
              onUpdate={updateTodos}
            />
          ) : (
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              onEdit={startEditingTodo}
            />
          )}
        </div>
      ))}
    </div>
  )
}
export default TodoList
