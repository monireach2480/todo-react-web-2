import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, ListTodo, Plus } from "lucide-react";
import { isToday, isPast, parseISO } from "date-fns";

function SummaryCard({ title, value, icon: Icon, color, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon size={18} className={color} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { todos } = useTodo();
  const { user } = useAuth();

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const overdue = todos.filter(
      (t) =>
        !t.completed &&
        t.dueDate &&
        isPast(parseISO(t.dueDate)) &&
        !isToday(parseISO(t.dueDate)),
    ).length;
    const todayTasks = todos.filter(
      (t) => t.dueDate && isToday(parseISO(t.dueDate)),
    );
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      overdue,
      todayTasks,
      completionRate,
      pending: total - completed,
    };
  }, [todos]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Here's your productivity overview
          </p>
        </div>
        <Button asChild>
          <Link to="/todos/add">
            <Plus size={16} className="mr-2" />
            Add Task
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          color="text-blue-500"
          description="All tasks created"
        />
        <SummaryCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="text-green-500"
          description="Tasks finished"
        />
        <SummaryCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="text-yellow-500"
          description="Still in progress"
        />
        <SummaryCard
          title="Overdue"
          value={stats.overdue}
          icon={AlertCircle}
          color="text-red-500"
          description="Past due date"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={stats.completionRate} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {stats.completionRate}% completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">
            Today's Tasks ({stats.todayTasks.length})
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/todos">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {stats.todayTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">
              No tasks due today 🎉
            </p>
          ) : (
            <div className="space-y-2">
              {stats.todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded border"
                >
                  <span
                    className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </span>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
