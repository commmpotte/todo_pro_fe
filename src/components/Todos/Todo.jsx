import { RiTodoFill, RiDeleteBin2Line, RiPencilFill } from 'react-icons/ri'
import { FaCheck, FaHourglassStart, FaSpinner } from 'react-icons/fa'
import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, toggleTodo, onEdit }) {
  const getStatusIcon = () => {
    switch (todo.status) {
      case 'inProgress':
        return <FaHourglassStart className={styles.inProgressIcon} />
      case 'waiting':
        return <FaSpinner className={styles.waitingIcon} />
      case 'completed':
        return <FaCheck className={styles.completedIcon} />
      default:
        return null
    }
  }

  return (
    <div
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ''
      } ${styles[todo.status]}`}
    >
      <RiTodoFill className={styles.todoIcon} />
      <div className={styles.todoText}>
        <div className={styles.title}>
          <b>{todo.title}</b>
        </div>
        <div className={styles.description}>{todo.description}</div>
      </div>
      <div className={styles.status}>{getStatusIcon()}</div>
      <RiPencilFill
        className={styles.editIcon}
        onClick={() => onEdit(todo._id)}
      />
      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={() => deleteTodo(todo._id)}
      />
    </div>
  )
}

export default Todo
