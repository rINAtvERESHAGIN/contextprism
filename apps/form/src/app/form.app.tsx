import { PanelContainer, Sidebar } from '@contextprism/ai-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';

const queryClient = new QueryClient();

export function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <PanelContainer sidebar={<Sidebar />}>
          <div>Future form</div>
        </PanelContainer>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
