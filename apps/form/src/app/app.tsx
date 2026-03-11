import { PanelContainer, Sidebar } from '@contextprism/ai-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PanelContainer sidebar={<Sidebar />}>
        <div>Future form</div>
      </PanelContainer>
    </QueryClientProvider>
  );
}

export default App;
