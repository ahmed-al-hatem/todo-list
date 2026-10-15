import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'
import './AddTodo.css'

export default function AddTodo() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((s) => s.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        className="add-todo__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button className="add-todo__btn" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}
