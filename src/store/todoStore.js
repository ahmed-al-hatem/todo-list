import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

const filterTodos = (todos, filter) => {
  if (filter === 'active') return todos.filter((t) => !t.done)
  if (filter === 'done') return todos.filter((t) => t.done)
  return todos
}

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      editingId: null,

      addTodo: (text) => {
        const clean = text.trim()
        if (!clean) return
        const todo = { id: crypto.randomUUID(), text: clean, done: false, createdAt: Date.now() }
        set((s) => ({ todos: [...s.todos, todo] }))
      },

      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),

      updateTodo: (id, text) => {
        const clean = text.trim()
        set((s) => ({
          todos: clean
            ? s.todos.map((t) => (t.id === id ? { ...t, text: clean } : t))
            : s.todos.filter((t) => t.id !== id),
          editingId: null,
        }))
      },

      startEditing: (id) => set({ editingId: id }),
      stopEditing: () => set({ editingId: null }),
      setFilter: (filter) => set({ filter }),

      clearCompleted: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),

      toggleAll: () => {
        const allDone = get().todos.every((t) => t.done)
        set({ todos: get().todos.map((t) => ({ ...t, done: !allDone })) })
      },
    }),
    {
      name: 'todos-store',
      partialize: (s) => ({ todos: s.todos, filter: s.filter }),
    },
  ),
)

export const useFilter = () => useTodoStore((s) => s.filter)
export const useTodo = (id) => useTodoStore((s) => s.todos.find((t) => t.id === id))
export const useIsEditing = (id) => useTodoStore((s) => s.editingId === id)

// useShallow: filter + map return a new array every call, which would loop renders
export const useVisibleIds = () =>
  useTodoStore(useShallow((s) => filterTodos(s.todos, s.filter).map((t) => t.id)))

export const useTotalCount = () => useTodoStore((s) => s.todos.length)
export const useActiveCount = () => useTodoStore((s) => s.todos.filter((t) => !t.done).length)
export const useDoneCount = () => useTodoStore((s) => s.todos.filter((t) => t.done).length)
