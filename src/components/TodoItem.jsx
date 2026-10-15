import { memo, useState } from 'react'
import { useTodoStore, useTodo, useIsEditing } from '../store/todoStore'
import './TodoItem.css'

function TodoItem({ id }) {
  const todo = useTodo(id)
  const isEditing = useIsEditing(id)
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)
  const updateTodo = useTodoStore((s) => s.updateTodo)
  const startEditing = useTodoStore((s) => s.startEditing)
  const stopEditing = useTodoStore((s) => s.stopEditing)
  const [draft, setDraft] = useState('')

  if (!todo) return null

  const beginEdit = () => {
    setDraft(todo.text)
    startEditing(id)
  }

  const save = () => updateTodo(id, draft)
  const isStillEditing = () => useTodoStore.getState().editingId === id

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') stopEditing()
  }

  const handleBlur = () => {
    if (isStillEditing()) save()
  }

  return (
    <li className={`todo-item${todo.done ? ' todo-item--done' : ''}`}>
      <input
        className="todo-item__check"
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(id)}
        aria-label="Toggle task"
      />

      {isEditing ? (
        <input
          className="todo-item__edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span className="todo-item__text" onDoubleClick={beginEdit}>
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button className="todo-item__btn" onClick={beginEdit} aria-label="Edit">
          ✎
        </button>
      )}
      <button
        className="todo-item__btn todo-item__btn--danger"
        onClick={() => removeTodo(id)}
        aria-label="Delete"
      >
        ✕
      </button>
    </li>
  )
}

export default memo(TodoItem)
