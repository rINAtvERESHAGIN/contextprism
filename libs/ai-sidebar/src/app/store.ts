import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

interface SidebarStore {
  lastUserLLM: string;
  setLastUserLLM: (value: string) => void;
}

const store: StateCreator<SidebarStore, [], [], SidebarStore> = set => ({
  lastUserLLM: '',
  lastMessage: [],
  setLastUserLLM: (val: string) =>
    set(state => {
      state.lastUserLLM = val;
    }),
});

const withImmer = immer(store);

const withPersist = persist(withImmer, {
  name: 'sidebar-storage',
  storage: createJSONStorage(() => localStorage),
});

const withDevTools = devtools(withPersist, {
  name: 'shopping-cart',
  // version: 1,          // можно указать версию и сделать миграцию
});

export const useSidebarStore = create(withDevTools);
