# 🧩 Taskly — Gamified Task Manager

A modern **Next.js + TypeScript** application that transforms task management into a **gamified experience**.  
Track tasks, earn XP, unlock achievements, and level up — all with a smooth, optimized UI powered by **Zustand**, **Zod**, and **React Hook Form**.

👉 **Live Demo:** [Taskly Board](https://taskly-board-m4k2onxq4-hayksyans-projects.vercel.app/)

---

## 🚀 Tech Stack

| Technology                  | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| **Next.js 15 (App Router)** | Framework for React and full-stack routes  |
| **TypeScript**              | Static typing and reliability              |
| **TailwindCSS**             | Utility-first responsive styling           |
| **Zustand**                 | Lightweight global state management        |
| **Zod**                     | Schema validation for forms and API inputs |
| **React Hook Form**         | Performant form handling with Zod resolver |
| **Jest + Testing Library**  | Unit testing and component validation      |
| **GitHub Actions**          | CI pipeline for linting and testing        |

---

## 🧠 Features

- 🗂️ **Task Management**

  - Create, edit, and delete tasks with optimistic UI updates
  - Search tasks using RegExp matching
  - Persistent task state and progress tracking

- 🕹️ **Gamification Engine**

  - Earn **XP** for completing tasks
  - Unlock **achievements** and trigger celebratory confetti 🎉
  - Track **levels** and badges stored in localStorage

- ⚡ **Modern Architecture**

  - Modular **Next.js (App Router)** structure
  - Shared utilities, schemas, and hooks for scalable growth
  - Zustand store separation per domain (tasks, achievements, game state)

- 🧩 **Type-Safe Validation**

  - All inputs validated with Zod schemas
  - Strong TypeScript inference across forms and stores

- 🧪 **Tested and Automated**
  - Jest unit tests for stores and UI logic
  - GitHub Actions CI for build + test validation on every push

---

## 🏗️ Project Structure

```bash
app/
│
├── layout.tsx                # Root layout
│
├── shared/                   # Shared, reusable modules
│   ├── hooks/                # Custom global hooks
│   ├── libs/                 # Utilities (confetti, helpers, etc.)
│   ├── store/                # Global Zustand stores
│   └── components/ui/        # Reusable UI primitives
│
├── (tasks)/                  # Task management feature group
│   ├── components/           # Task list, item, and form UI
│   ├── hooks/                # useTasks and related logic
│   ├── store/                # Zustand store for tasks
│   ├── types/                # Task-related TypeScript types
│   └── schemas/              # Zod schema definitions
│
└── (achievements)/           # Gamification & XP system
    ├── components/           # Achievements display
    └── store/                # Zustand store for gamification
```

---

## ⚙️ Installation & Development

```bash
git clone https://github.com/HaykSyan/taskly-board.git
cd taskly-board

# Install dependencies
pnpm install
# or
npm install
# or
yarn install

# Run locally
pnpm dev
# or
npm run dev
# or
yarn run dev

# Build for production
pnpm build && pnpm start
# or
npm run build && npm start
# or
yarn build && yarn start

```

## 🧪 Testing

```bash
pnpm test
# or
npm test
# or
yarn test
```

## 👨‍💻 Author

### Hayk Sargsyan

Frontend Engineer | React • Next.js • TypeScript

## License

MIT © 2025 Hayk Sargsyan
