import { useTodoStore, useTotalCount, useDoneCount } from '../store/todoStore'
import './Tools.css'

export default function Tools() {
  const total = useTotalCount()
  const doneCount = useDoneCount()
  const toggleAll = useTodoStore((s) => s.toggleAll)
  const clearCompleted = useTodoStore((s) => s.clearCompleted)

  return (
    <div className="tools">
      <button className="tools__btn" onClick={toggleAll} disabled={total === 0}>
        Toggle all
      </button>
      <button className="tools__btn" onClick={clearCompleted} disabled={doneCount === 0}>
        Clear completed
      </button>
    </div>
  )
}
