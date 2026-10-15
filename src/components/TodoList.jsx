import { useVisibleIds } from '../store/todoStore'
import TodoItem from './TodoItem'
import './TodoList.css'

export default function TodoList() {
  const ids = useVisibleIds()

  if (ids.length === 0) return <p className="todo-list__empty">No tasks</p>

  return (
    <ul className="todo-list">
      {ids.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </ul>
  )
}
