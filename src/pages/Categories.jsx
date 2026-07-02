import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

export default function Categories() {
  const { categories, todos, addCategory, updateCategory, deleteCategory } =
    useTodo();
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const getCount = (catId) =>
    todos.filter((t) => t.categoryId === catId).length;

  const handleAdd = () => {
    if (!newName.trim()) return toast.error("Enter a category name");
    addCategory({ name: newName.trim(), color: newColor });
    setNewName("");
    toast.success("Category added");
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return toast.error("Name cannot be empty");
    updateCategory(id, { name: editName.trim() });
    setEditId(null);
    toast.success("Category updated");
  };

  const handleDelete = (id) => {
    deleteCategory(id);
    toast.success("Category deleted");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Category name"
              className="flex-1"
            />
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform
                  ${newColor === c ? "border-foreground scale-125" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <Button onClick={handleAdd}>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {categories.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No categories yet
          </p>
        )}
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardContent className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                {editId === cat.id ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-7 w-40"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                  />
                ) : (
                  <span className="font-medium">{cat.name}</span>
                )}
                <Badge variant="secondary">{getCount(cat.id)} tasks</Badge>
              </div>
              <div className="flex gap-2">
                {editId === cat.id ? (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => handleUpdate(cat.id)}
                    >
                      <Check size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => setEditId(null)}
                    >
                      <X size={14} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => {
                        setEditId(cat.id);
                        setEditName(cat.name);
                      }}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
