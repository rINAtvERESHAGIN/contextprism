import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const MainLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const TitleLayout = styled.div`
  padding: 12px;
`;

const InputLayout = styled.div`
  padding: 4px;
`;

const MessagesChatLayout = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  border-left: 1px solid #e5e7eb;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  gap: 12px;
  padding: 16px;
`;

export function SidebarLayout(props: PropsWithChildren) {
  return <MainLayout>{props.children}</MainLayout>;
}

SidebarLayout.TitleLayout = TitleLayout;
SidebarLayout.InputLayout = InputLayout;
SidebarLayout.MessagesChatLayout = MessagesChatLayout;
