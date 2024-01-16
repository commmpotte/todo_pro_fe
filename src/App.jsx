import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const updatedFromInside = useRef(false)

  useEffect(() => {
    fetchTodos() // Изначальное получение списка задач
  }, [])

  const addTodoHandler = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', {
        title: task.title,
        description: task.description,
        status: task.status,
      })

      const newTodo = {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
      }
      setTodos((prevTodos) => [...prevTodos, newTodo])

      updatedFromInside.current = true
      fetchTodos()
    } catch (error) {
      console.error('Error adding task', error)
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks')
      setTodos(response.data)
      console.log('Список задач обновлен:', response.data)
    } catch (error) {
      console.error('Error fetching tasks', error)
    }
  }

  // Удаление задачи на сервере
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`)
      // После успешного удаления обновляем список задач
      setTimeout(() => {
        fetchTodos()
      }, 1500)
    } catch (error) {
      console.error('Error deleting task', error)
    }
  }

  const toggleTodoHandler = (id) => {
    // Обновление статуса задачи на сервере
    axios
      .patch(`http://localhost:3001/api/tasks/${id}`)
      .then((response) =>
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      )
      .catch((error) => console.error('Error toggling task', error))
  }

  const resetTodosHandler = () => {
    // Удаление всех задач на сервере
    axios
      .delete('http://localhost:3001/api/tasks')
      .then(() => setTodos([]))
      .catch((error) => console.error('Error resetting tasks', error))
  }

  const deleteCompletedTodosHandler = async () => {
    try {
      await axios.delete('http://localhost:3001/api/tasks?completed=true')

      fetchTodos()
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted))
    } catch (error) {
      console.error('Error deleting completed tasks', error)
    }
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length

  return (
    <div className="App">
      <h1> Todo App </h1> <TodoForm addTodo={addTodoHandler} />{' '}
      {!!todos.length && (
        <TodosActions
          completedTodosExist={!!completedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodoHandler}
        updateTodos={fetchTodos}
      />
    </div>
  )
}

export default App
