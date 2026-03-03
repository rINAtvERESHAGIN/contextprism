import { PanelContainer } from './WithAiSidebar.ui';

export interface WithAiSidebarProps {
  enabled?: false;
}
export function withAiSidebar<P extends Record<string, unknown>>(
  Wrapped: React.ComponentType<P>
) {
  function ComponentWithAiChat(props: P & WithAiSidebarProps) {
    const { enabled, ...rest } = props as P & WithAiSidebarProps;
    return (
      <PanelContainer>
        <Wrapped {...(rest as P)} />
      </PanelContainer>
    );
  }

  ComponentWithAiChat.displayName = `withAiSidebar(${
    Wrapped.displayName || Wrapped.name || 'Component'
  })`;

  return ComponentWithAiChat;
}
