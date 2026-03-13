import { PanelContainer, Sidebar } from '@contextprism/ai-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';

const queryClient = new QueryClient();

function PanelSidebar() {
  return (
    <PanelContainer sidebar={<Sidebar />}>
      <div>Future form</div>
    </PanelContainer>
  );
}

export function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        {/* <PanelSidebar /> */}
        <Sidebar />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
