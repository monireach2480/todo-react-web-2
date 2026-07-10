# 📝 Todo App — React.js Final Project

A full-featured todo application with mock authentication, per-user data isolation, and rich task management features. Built with React 19, Tailwind CSS v4, and shadcn/ui.

## 🌐 Live Demo

> **[https://todo-react-seven-lac.vercel.app/]([https://your-app.vercel.app](https://todo-react-seven-lac.vercel.app/))**

## 📁 Repository

> **[https://github.com/monireach2480/todo-react-web-2](https://github.com/monireach2480/todo-react-web-2)**

---



## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| State Management | React Context API |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Notifications | react-hot-toast |
| Date Utilities | date-fns |
| Form Handling | React Hook Form + Zod |
| Deployment | Vercel |

---

## ✨ Features

- 🔐 **Mock Authentication** — Register/Login with per-user data isolation
- 📊 **Dashboard** — Summary stats, progress bar, today's tasks overview
- ✅ **Todo Management** — Create, edit, delete, complete tasks
- 🔍 **Filter & Sort** — Filter by status, priority, category; sort by due date, priority, name
- 🏷️ **Categories** — Create color-coded categories with task counts
- 📅 **Due Dates** — Overdue detection and highlighting
- ⚙️ **Settings** — Dark/light mode, default priority, clear data
- 💾 **Persistence** — All data saved to localStorage per user
- 📱 **Responsive** — Works on mobile and desktop

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with active link highlighting
│   └── ProtectedRoute.jsx  # Route guard for authenticated pages
├── context/
│   ├── AuthContext.jsx     # Authentication state and methods
│   └── TodoContext.jsx     # Todo/category state and localStorage sync
├── hooks/
│   └── useLocalStorage.js  # Reusable localStorage hook
├── pages/
│   ├── Login.jsx           # Login and Register page
│   ├── Dashboard.jsx       # Stats overview and today's tasks
│   ├── TodoList.jsx        # All tasks with filter/sort/search
│   ├── AddEditTask.jsx     # Create and edit task form
│   ├── Categories.jsx      # Manage categories
│   └── Settings.jsx        # App preferences and account options
├── utils/
│   └── helpers.js          # Shared utility functions
├── App.jsx                 # Root component with routing
└── main.jsx                # Entry point
```

---

## 🗂️ Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Login / Register | `/` | Authentication |
| Dashboard | `/dashboard` | Stats overview |
| Todo List | `/todos` | All tasks |
| Add Task | `/todos/add` | Create new task |
| Edit Task | `/todos/edit/:id` | Edit existing task |
| Categories | `/categories` | Manage categories |
| Settings | `/settings` | Preferences |

---

## 🌿 Git Workflow

```
main        ← production (auto-deploys to Vercel)
dev         ← integration branch
feature/*   ← individual feature branches
```

All changes go through Pull Requests reviewed by the team leader before merging.

---

## 📄 License

This project was built as a course final project for educational purposes.
