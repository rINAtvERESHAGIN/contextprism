import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoAppWithAi } from './todo.app';
// ─── Component ───────────────────────────────────────────────────────

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoAppWithAi />
    </QueryClientProvider>
  );
};

export default App;
