import { Sidebar } from '../../main';
import { PanelContainer } from './ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export interface WithAiSidebarProps {
  enabled?: false;
}

const queryClient = new QueryClient();

export function withAiSidebar<P extends Record<string, unknown>>(
  Wrapped: React.ComponentType<P>
) {
  function ComponentWithAiChat(props: P & WithAiSidebarProps) {
    const { enabled, ...rest } = props as P & WithAiSidebarProps;
    return (
      <QueryClientProvider client={queryClient}>
        {/* <Sidebar /> */}
        {/* <PanelContainer sidebar={<Sidebar />}> */}
          <div style={{ backgroundColor: 'red' }}>
            {/* <Sidebar /> */}
            hello!!323OFPSDOFPSODPFOSPFOsfd
            <Wrapped {...(rest as P)} />
          </div>
        {/* </PanelContainer> */}
      </QueryClientProvider>
      // {/* // <Wrapped {...(rest as P)} /> */}
    );
  }

  return ComponentWithAiChat;
}
