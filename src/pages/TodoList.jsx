import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTodo } from '../context/TodoContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { format, parseISO, isPast, isToday } from 'date-fns'
import toast from 'react-hot-toast'

const PRIORITY_COLOR = { high: 'destructive', medium: 'default', low: 'secondary' }

export default function TodoList() {
  const { todos, categories, toggleTodo, deleteTodo } = useTodo()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  const filtered = useMemo(() => {
    let result = [...todos]
    if (search) result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    if (filterStatus === 'active') result = result.filter(t => !t.completed)
    if (filterStatus === 'completed') result = result.filter(t => t.completed)
    if (filterPriority !== 'all') result = result.filter(t => t.priority === filterPriority)
    if (filterCategory !== 'all') result = result.filter(t => t.categoryId === filterCategory)
    result.sort((a, b) => {
      if (sortBy === 'dueDate') return (a.dueDate || 'z') > (b.dueDate || 'z') ? 1 : -1
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.priority] - order[b.priority]
      }
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return result
  }, [todos, search, filterStatus, filterPriority, filterCategory, sortBy])

  const isOverdue = (t) => t.dueDate && !t.completed && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate))

  const handleDelete = (id) => {
    deleteTodo(id)
    toast.success('Task deleted')
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>My Tasks</h1>
        <Button asChild><Link to='/todos/add'><Plus size={16} className='mr-1' />Add Task</Link></Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div className='relative flex-1 min-w-40'>
          <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
          <Input className='pl-8' placeholder='Search tasks...' value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className='w-32'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='completed'>Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className='w-32'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Priority</SelectItem>
            <SelectItem value='high'>High</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='low'>Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className='w-36'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className='w-36'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value='createdAt'>Newest First</SelectItem>
            <SelectItem value='dueDate'>Due Date</SelectItem>
            <SelectItem value='priority'>Priority</SelectItem>
            <SelectItem value='title'>Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <div className='text-center py-16 text-muted-foreground'>
          <p className='text-lg'>No tasks found</p>
          <Button asChild className='mt-3'><Link to='/todos/add'>Create your first task</Link></Button>
        </div>
      ) : (
        <div className='space-y-2'>
          {filtered.map(task => {
            const cat = categories.find(c => c.id === task.categoryId)
            return (
              <Card key={task.id} className={isOverdue(task) ? 'border-red-400' : ''}>
                <CardContent className='flex items-center gap-3 py-3'>
                  <Checkbox checked={task.completed}
                    onCheckedChange={() => toggleTodo(task.id)} />
                  <div className='flex-1 min-w-0'>
                    <p className={`font-medium truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <div className='flex flex-wrap gap-2 mt-1'>
                      <Badge variant={PRIORITY_COLOR[task.priority]}>{task.priority}</Badge>
                      {cat && <Badge style={{ backgroundColor: cat.color }} className='text-white'>{cat.name}</Badge>}
                      {task.dueDate && (
                        <span className={`text-xs ${isOverdue(task) ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                          {isOverdue(task) ? 'Overdue: ' : 'Due: '}{format(parseISO(task.dueDate), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <Button size='icon' variant='ghost' className='h-7 w-7' asChild>
                      <Link to={`/todos/edit/${task.id}`}><Pencil size={14} /></Link>
                    </Button>
                    <Button size='icon' variant='ghost' className='h-7 w-7 text-destructive'
                      onClick={() => handleDelete(task.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}