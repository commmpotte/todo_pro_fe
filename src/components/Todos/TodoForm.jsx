import { useState } from 'react'
import styles from './TodoForm.module.css'

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (title && status) {
      addTodo({
        title,
        description,
        status,
      })
      setTitle('')
      setDescription('')
      setStatus('')
      console.log(addTodo)
    } else {
      console.error('Title and status are required')
    }
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>{' '}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value=""> Select status </option>{' '}
          <option value="completed"> Completed </option>{' '}
          <option value="inProgress"> In Progress </option>{' '}
          <option value="waiting"> Waiting </option>{' '}
        </select>{' '}
        <button type="submit" title="Submit">
          Submit{' '}
        </button>{' '}
      </form>{' '}
    </div>
  )
}

export default TodoForm
