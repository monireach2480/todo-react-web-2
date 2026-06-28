import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const TodoContext = createContext(null)

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Personal', color: '#3B82F6' },
  { id: '2', name: 'Work',     color: '#10B981' },
  { id: '3', name: 'Shopping', color: '#F59E0B' },
]

export function TodoProvider({ children }) {
  const { user } = useAuth()
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [settings, setSettings] = useState({ theme: 'light', defaultPriority: 'medium' })

  const userKey = (key) => `${user?.username}_${key}`

  useEffect(() => {
    if (!user) return
    const t = localStorage.getItem(userKey('todos'))
    const c = localStorage.getItem(userKey('categories'))
    const s = localStorage.getItem(userKey('settings'))
    if (t) setTodos(JSON.parse(t))
    if (c) setCategories(JSON.parse(c))
    if (s) setSettings(JSON.parse(s))
  }, [user])

  const saveTodos = (newTodos) => {
    setTodos(newTodos)
    localStorage.setItem(userKey('todos'), JSON.stringify(newTodos))
  }
  const saveCategories = (newCats) => {
    setCategories(newCats)
    localStorage.setItem(userKey('categories'), JSON.stringify(newCats))
  }
  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem(userKey('settings'), JSON.stringify(newSettings))
  }

  const addTodo = (todo) => {
    const newTodo = { ...todo, id: crypto.randomUUID(), createdAt: new Date().toISOString(), completed: false }
    saveTodos([...todos, newTodo])
  }
  const updateTodo = (id, updates) =>
    saveTodos(todos.map(t => t.id === id ? { ...t, ...updates } : t))
  const deleteTodo = (id) => saveTodos(todos.filter(t => t.id !== id))
  const toggleTodo = (id) =>
    saveTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  const addCategory = (cat) => {
    const newCat = { ...cat, id: crypto.randomUUID() }
    saveCategories([...categories, newCat])
  }
  const updateCategory = (id, updates) =>
    saveCategories(categories.map(c => c.id === id ? { ...c, ...updates } : c))
  const deleteCategory = (id) => {
    saveCategories(categories.filter(c => c.id !== id))
    saveTodos(todos.map(t => t.categoryId === id ? { ...t, categoryId: null } : t))
  }

  return (
    <TodoContext.Provider value={{
      todos, categories, settings,
      addTodo, updateTodo, deleteTodo, toggleTodo,
      addCategory, updateCategory, deleteCategory,
      saveSettings
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext)
