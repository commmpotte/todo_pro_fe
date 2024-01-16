
import React, { useState } from 'react'
import Button from '../UI/Button'
import styles from './TodoEditForm.module.css'

function TodoEditForm({ todo, onSave, onCancel, onUpdate }) {
  const [editedTodo, setEditedTodo] = useState({ ...todo })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    })
  }

  const handleSaveClick = async () => {
    await onSave(editedTodo)
    onUpdate() 
  }

  return (
    <div className={styles.editFormContainer}>
      <input
        type="text"
        name="title"
        value={editedTodo.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        value={editedTodo.description}
        onChange={handleInputChange}
      />
      <select
        name="status"
        value={editedTodo.status}
        onChange={handleInputChange}
      >
        <option value="completed">Completed</option>
        <option value="inProgress">In Progress</option>
        <option value="waiting">Waiting</option>
      </select>
      <div className={styles.editFormButtons}>
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default TodoEditForm
