import AddTodo from './components/AddTodo'
import Filters from './components/Filters'
import TodoList from './components/TodoList'
import Stats from './components/Stats'
import Tools from './components/Tools'
import './App.css'

export default function App() {
  return (
    <main className="app">
      <h1 className="app__title">Todo List</h1>
      <AddTodo />
      <Filters />
      <TodoList />
      <Stats />
      <Tools />
    </main>
  )
}
