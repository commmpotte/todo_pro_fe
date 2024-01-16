import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri'
import Button from '../UI/Button'

function TodosActions({ resetTodos, deleteCompletedTodos }) {
  const confirmDeleteCompletedTodos = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete all completed todos?'
    )

    if (shouldDelete) {
      deleteCompletedTodos()
    }
  }
  return (
    <div>
      <Button tooltip="Reset Todos" onClick={resetTodos}>
        <RiRefreshLine />
      </Button>{' '}
      <Button
        tooltip="Clear Completed Todos"
        onClick={confirmDeleteCompletedTodos}
      >
        <RiDeleteBin2Line />
      </Button>{' '}
    </div>
  )
}

export default TodosActions
