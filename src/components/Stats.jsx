import { useTotalCount, useActiveCount, useDoneCount } from '../store/todoStore'
import './Stats.css'

export default function Stats() {
  const total = useTotalCount()
  const active = useActiveCount()
  const done = useDoneCount()

  return (
    <div className="stats">
      <span>Total: {total}</span>
      <span>Active: {active}</span>
      <span>Done: {done}</span>
    </div>
  )
}
