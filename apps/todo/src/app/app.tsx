import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { TodoApp } from './todo.app';
import {
  withAiSidebar,
  useSidebarStore,
  useSidebarApi,
  PanelContainer,
  Sidebar,
} from '@contextprism/ai-sidebar';
import { TodoAppOriginal } from './todo.app';
// import css from '@contextprism/aiui/index.css';
// ─── Component ───────────────────────────────────────────────────────
// styles

const We = withAiSidebar(() => {
  return <div>We3</div>;
});

const App: React.FC = () => {
  useSidebarStore();
  useSidebarApi();
  return (
    // <PanelContainer sidebar={() => <div>Sidebar</div>}>
    <PanelContainer sidebar={<Sidebar />}>
      {/* <We /> */}
      <TodoAppOriginal />
    </PanelContainer>
  );
};

export default App;
