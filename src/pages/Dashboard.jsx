import { Link } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { todos } = useTodo();
  const { user } = useAuth();

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  const todayTasks = todos.filter((todo) => todo.dueDate);

  return (
    <div className="p-6">
      <h1>Welcome back, {user.username}!</h1>

      <div>
        <p>Total Tasks: {total}</p>
        <p>Completed: {completed}</p>
      </div>

      <Link to="/todos/new">Add Task</Link>

      <h2>Today's Tasks</h2>

      {todayTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
