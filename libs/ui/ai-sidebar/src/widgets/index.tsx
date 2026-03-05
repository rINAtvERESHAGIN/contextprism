import { Group, Panel } from 'react-resizable-panels';
import { PropsWithChildren } from 'react';
import { Separator } from 'react-resizable-panels';
import styled from 'styled-components';
import { Sidebar } from '../app/Sidebar';

export const StyledSeparator = styled(Separator)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 9px;
  user-select: none;
  touch-action: none;
  transition: width 0.2s ease-out;
  &:hover {
    width: 9px;
  }
`;

export const HandleLine = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 60px;
  border-radius: 9999px;
  background: rgba(150, 150, 150, 0.35);
  opacity: 0;
  transform: translateX(-50%) scale(0.85);
  transition: all 0.22s ease-out;

  ${StyledSeparator}:hover & {
    opacity: 0.9;
    background: rgba(100, 100, 100, 0.7);
    transform: translateX(-50%) scale(1);
  }

  ${StyledSeparator}:active &,
  &[data-resize-handle-active] & {
    background: #3b82f6;
    opacity: 1;
    transform: translateX(-50%) scale(1.15);
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export function PanelContainer({ children }: PropsWithChildren) {
  return (
    <Container>
      <Group orientation='horizontal'>
        <Panel id='left-ai-chat' collapsible>
          <Sidebar />
        </Panel>

        <StyledSeparator>
          <HandleLine />
        </StyledSeparator>

        <Panel id='min-content-container' collapsible={false} minSize={'25%'}>
          {children}
        </Panel>
      </Group>
    </Container>
  );
}
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
