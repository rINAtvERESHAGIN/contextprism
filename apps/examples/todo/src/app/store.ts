import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoStore {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (text) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now(), text, completed: false }],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    { name: 'todo-storage' },
  ),
);
