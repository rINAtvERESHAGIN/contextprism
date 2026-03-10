import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { TodoApp } from './todo.app';
import { Weed as word, withAiSidebar, Comp } from '@contextprism/ai-sidebar';
// import css from '@contextprism/aiui/index.css';
// ─── Component ───────────────────────────────────────────────────────
// styles
// const queryClient = new QueryClient();

const We = withAiSidebar(() => {
  return <div>We3</div>;
});

const App: React.FC = () => {
  return (
    // <QueryClientProvider client={queryClient}>
      <We />
    // </QueryClientProvider>
  );
};

export default App;
