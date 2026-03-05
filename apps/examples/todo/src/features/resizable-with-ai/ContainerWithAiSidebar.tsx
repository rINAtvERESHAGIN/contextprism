import { Group, Panel } from 'react-resizable-panels';
import { Sidebar } from '../sidebar/ui/Sidebar';
import { FC, PropsWithChildren,  } from 'react';
import styled from 'styled-components';
import { StyledSeparator } from '../../shared/styled-ui/Separator';
import { HandleLine } from '../../shared/styled-ui/HandleLine';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

function PanelContainer({ children }: PropsWithChildren) {
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

export function WithAiSidebar({ WrapperComponent }: { WrapperComponent: FC }) {
  return function Wrapper() {
    return (
      <PanelContainer>
        <WrapperComponent />
      </PanelContainer>
    );
  };
}
