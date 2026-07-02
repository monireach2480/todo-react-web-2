import { Link } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useAuth } from "../context/AuthContext";
import { isToday, isPast, parseISO } from "date-fns";

export default function Dashboard() {
  const { todos } = useTodo();
  const { user } = useAuth();

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const overdue = todos.filter(
    (todo) => !todo.completed && todo.dueDate && isPast(parseISO(todo.dueDate)),
  ).length;

  const pending = total - completed;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const todayTasks = todos.filter(
    (todo) => todo.dueDate && isToday(parseISO(todo.dueDate)),
  );

  return (
    <div className="p-6">
      <h1>Welcome back, {user?.username}!</h1>
      <p>Total Tasks: {total}</p>
      <p>Completed: {completed}</p>
      <p>Overdue: {overdue}</p>
      <h2>Today's Tasks</h2>
      {todayTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
