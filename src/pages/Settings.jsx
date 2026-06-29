import { useAuth } from '../context/AuthContext'
import { useTodo } from '../context/TodoContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Settings() {
  const { user, logout } = useAuth()
  const { settings, saveSettings, todos } = useTodo()
  const navigate = useNavigate()

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark'
    saveSettings({ ...settings, theme: newTheme })
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    toast.success(`Switched to ${newTheme} mode`)
  }

  const handleClearTodos = () => {
    if (!confirm('Delete all tasks? This cannot be undone.')) return
    const key = `${user.username}_todos`
    localStorage.removeItem(key)
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Logged out')
  }

  return (
    <div className='max-w-lg mx-auto space-y-4'>
      <h1 className='text-2xl font-bold'>Settings</h1>
      <Card>
        <CardHeader><CardTitle className='text-base'>Account</CardTitle></CardHeader>
        <CardContent className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Logged in as</p>
          <p className='font-semibold text-lg'>{user?.username}</p>
          <p className='text-sm text-muted-foreground'>{todos.length} tasks in your account</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className='text-base'>Preferences</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Label>Dark Mode</Label>
            <Switch checked={settings.theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
          <Separator />
          <div className='space-y-1'>
            <Label>Default Priority</Label>
            <Select value={settings.defaultPriority}
              onValueChange={v => saveSettings({ ...settings, defaultPriority: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value='high'>High</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='low'>Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className='text-base text-destructive'>Danger Zone</CardTitle></CardHeader>
        <CardContent className='space-y-3'>
          <Button variant='destructive' className='w-full' onClick={handleClearTodos}>
            Delete All Tasks
          </Button>
          <Button variant='outline' className='w-full' onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}