import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import { ModelUi } from '@contextprism/ai-components';

interface ChatStore {
  lastUserLLM: ModelUi | undefined;
  setLastUserLLM: (value: string) => void;
}

const store: StateCreator<ChatStore, [], [], ChatStore> = set => ({
  lastUserLLM: undefined,
  lastMessage: [],
  setLastUserLLM: (val: string) =>
    set(
      state => {
        state.lastUserLLM = val;
      },
      false,
      'chat/set-current-llm-model'
    ),
});

const withImmer = immer(store);

const withPersist = persist(withImmer, {
  name: 'ChatStorage',
  storage: createJSONStorage(() => localStorage),
});

const withDevTools = devtools(withPersist, {
  name: 'ChatStorage',
  // version: 1,          // можно указать версию и сделать миграцию
});

export const useChatStore = create(withDevTools);
