import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) return toast.error('Fill in all fields')
    const result = isRegister ? register(username, password) : login(username, password)
    if (result.error) return toast.error(result.error)
    toast.success(isRegister ? 'Account created!' : 'Welcome back!')
    navigate('/dashboard')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/40'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' value={username}
                onChange={e => setUsername(e.target.value)} placeholder='Enter username' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' value={password}
                onChange={e => setPassword(e.target.value)} placeholder='Enter password' />
            </div>
            <Button type='submit' className='w-full'>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </form>
          <p className='text-center text-sm mt-4 text-muted-foreground'>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)}
              className='ml-1 text-primary underline'>
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
