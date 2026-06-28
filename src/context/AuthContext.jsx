import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('todo_session')
    if (session) setUser(JSON.parse(session))
    setLoading(false)
  }, [])

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('todo_users') || '{}')
    if (users[username]) return { error: 'Username already exists' }
    users[username] = { password, createdAt: new Date().toISOString() }
    localStorage.setItem('todo_users', JSON.stringify(users))
    const userData = { username }
    setUser(userData)
    localStorage.setItem('todo_session', JSON.stringify(userData))
    return { success: true }
  }

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('todo_users') || '{}')
    if (!users[username]) return { error: 'User not found' }
    if (users[username].password !== password) return { error: 'Wrong password' }
    const userData = { username }
    setUser(userData)
    localStorage.setItem('todo_session', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('todo_session')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
