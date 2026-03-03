// Sidebar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { TextField, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageList } from '../entities/MessageList/MessageList';
import { Title } from './Title.Sidebar';
import styled from 'styled-components';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { SearchInput } from '../form/SearchInput';

interface SidebarProps {
  // Можно передать open и onClose, если нужен временный режим
  // Для постоянного сайдбара эти пропсы не нужны
}

export const MainLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const TitleLayout = styled.div`
  padding: 12px;
`;

export const InputLayout = styled.div`
  padding: 4px;
`;

export const MessagesChatLayout = styled.div`
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

const RootLayout = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid;
  border-color: #e5e7eb;
  background-color: #fff;
`;

export function Sidebar({}: SidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/hono/api/llm/chat',
    }),
  });

  const [searchValue, setSearchValue] = useState('');

  function handleOnSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchValue.trim()) {
      sendMessage({ text: searchValue });
      setSearchValue('');
    }
  }

  const methods = useForm<FormValues>({
    defaultValues: {
      llmModel: '',
    },
  });

  const llmModel = useWatch({ name: 'llmModel', control: methods.control });

  useEffect(() => {
    console.log('llmModel', llmModel);
  }, [llmModel]);

  return (
    <FormProvider {...methods}>
      <RootLayout>
        <MainLayout>
          <TitleLayout>
            <Title />
          </TitleLayout>
          <InputLayout>
            <SearchInput/>
          </InputLayout>
          <Divider />
          <MessagesChatLayout>
            <MessageList messages={messages} />
            <div ref={scrollRef} />
          </MessagesChatLayout>
        </MainLayout>
      </RootLayout>
    </FormProvider>
  );
}
