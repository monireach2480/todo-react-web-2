import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { TodoProvider } from './context/TodoContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TodoList from './pages/TodoList'
import AddEditTask from './pages/AddEditTask'
import Categories from './pages/Categories'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'

function Layout({ children }) {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='container mx-auto px-4 py-6'>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <Toaster position='top-right' />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path='/todos' element={<ProtectedRoute><Layout><TodoList /></Layout></ProtectedRoute>} />
            <Route path='/todos/add' element={<ProtectedRoute><Layout><AddEditTask /></Layout></ProtectedRoute>} />
            <Route path='/todos/edit/:id' element={<ProtectedRoute><Layout><AddEditTask /></Layout></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Layout><Categories /></Layout></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  )
}
