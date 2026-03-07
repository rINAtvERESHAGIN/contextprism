// import { Sidebar } from '../../app/Sidebar';
// import { PanelContainer } from './ui';
// import '@contextprism/ai-uikit/index.css';
export interface WithAiSidebarProps {
  enabled?: false;
}
export function withAiSidebar<P extends Record<string, unknown>>(
  Wrapped: React.ComponentType<P>
) {
  function ComponentWithAiChat(props: P & WithAiSidebarProps) {
    const { enabled, ...rest } = props as P & WithAiSidebarProps;
    return (
      // <PanelContainer sidebar={<Sidebar />}>

      <div style={{ backgroundColor: 'red' }}>
        hello!
        <Wrapped {...(rest as P)} />
      </div>
      // {/* <Wrapped {...(rest as P)} /> */}
      // </PanelContainer>
    );
  }

  return ComponentWithAiChat;
}
