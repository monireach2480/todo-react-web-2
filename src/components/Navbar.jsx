import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { CheckSquare, LayoutDashboard, Tag, Settings, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/todos', label: 'Todos', icon: CheckSquare },
  { to: '/categories', label: 'Categories', icon: Tag },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <nav className='border-b bg-background sticky top-0 z-50'>
      <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <span className='font-bold text-primary'>TodoApp</span>
          <div className='hidden md:flex gap-4'>
            {links.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-1 text-sm font-medium transition-colors
                  ${location.pathname === to ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon size={16} />{label}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground hidden md:block'>Hi, {user?.username}</span>
          <Button variant='ghost' size='icon' onClick={handleLogout}>
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </nav>
  )
}
