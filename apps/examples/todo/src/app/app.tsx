import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoAppWithAi } from './todo.app';
import { Conversation } from '@contextprism/aiui';
import '@contextprism/aiui/ai-ui-theme.css';
// ─── Component ───────────────────────────────────────────────────────
// styles
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Conversation children={undefined} />
      <TodoAppWithAi />
    </QueryClientProvider>
  );
};

export default App;
