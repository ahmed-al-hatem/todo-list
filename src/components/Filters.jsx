import { useTodoStore, useFilter } from '../store/todoStore'
import './Filters.css'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
]

export default function Filters() {
  const filter = useFilter()
  const setFilter = useTodoStore((s) => s.setFilter)

  return (
    <div className="filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filters__btn${filter === f.value ? ' filters__btn--active' : ''}`}
          onClick={() => setFilter(f.value)}
          aria-pressed={filter === f.value}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
