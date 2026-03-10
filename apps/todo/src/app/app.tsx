import React from 'react';
import { PanelContainer, Sidebar } from '@contextprism/ai-sidebar';
import { TodoAppOriginal } from './todo.app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PanelContainer sidebar={<Sidebar />}>
        <TodoAppOriginal />
      </PanelContainer>
    </QueryClientProvider>
  );
};

export default App;
