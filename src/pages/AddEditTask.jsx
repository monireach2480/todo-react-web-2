import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTodo } from '../context/TodoContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  categoryId: z.string().optional(),
  dueDate: z.string().optional(),
})

export default function AddEditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { todos, categories, addTodo, updateTodo, settings } = useTodo()
  const isEdit = Boolean(id)
  const existing = todos.find(t => t.id === id)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { priority: settings.defaultPriority || 'medium' }
  })

  useEffect(() => {
    if (isEdit && existing) {
      setValue('title', existing.title)
      setValue('description', existing.description || '')
      setValue('priority', existing.priority)
      setValue('categoryId', existing.categoryId || '')
      setValue('dueDate', existing.dueDate || '')
    }
  }, [isEdit, existing])

  const onSubmit = (data) => {
    const clean = { ...data, categoryId: data.categoryId || null, dueDate: data.dueDate || null }
    if (isEdit) {
      updateTodo(id, clean)
      toast.success('Task updated')
    } else {
      addTodo(clean)
      toast.success('Task added')
    }
    navigate('/todos')
  }

  return (
    <div className='max-w-lg mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Task' : 'Add New Task'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-1'>
              <Label>Title *</Label>
              <Input {...register('title')} placeholder='Task title' />
              {errors.title && <p className='text-xs text-destructive'>{errors.title.message}</p>}
            </div>
            <div className='space-y-1'>
              <Label>Description</Label>
              <Input {...register('description')} placeholder='Optional description' />
            </div>
            <div className='space-y-1'>
              <Label>Priority</Label>
              <Select value={watch('priority')} onValueChange={v => setValue('priority', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='low'>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label>Category</Label>
              <Select value={watch('categoryId') || ''} onValueChange={v => setValue('categoryId', v)}>
                <SelectTrigger><SelectValue placeholder='Select category' /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label>Due Date</Label>
              <Input type='date' {...register('dueDate')} />
            </div>
            <div className='flex gap-2 pt-2'>
              <Button type='submit' className='flex-1'>{isEdit ? 'Update Task' : 'Add Task'}</Button>
              <Button type='button' variant='outline' onClick={() => navigate('/todos')}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}