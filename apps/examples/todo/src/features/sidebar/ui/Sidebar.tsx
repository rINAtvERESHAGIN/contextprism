import { Button, Divider } from '@mui/material';
import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { Title } from './Title.Sidebar';
import styled from 'styled-components';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SearchInput } from '../form/SearchInput';

import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
} from '@contextprism/aiui';

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

const Form = styled('form')`
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid;
  border-color: #e5e7eb;
  background-color: #fff;
`;

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export function Sidebar({}: SidebarProps) {
  const { messages, sendMessage, status, addToolOutput } = useChat({
    transport: new DefaultChatTransport({
      api: '/hono/api/llm/chat',
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) {
        return;
      }

      if (toolCall.toolName === 'getLocation') {
        const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];

        addToolOutput({
          tool: 'getLocation',
          toolCallId: toolCall.toolCallId,
          output: cities[Math.floor(Math.random() * cities.length)],
        });
      }
    },
  });

  const methods = useForm<SidebarFormValues>({
    mode: 'onChange',
    defaultValues: {
      llmModel: '',
      search: '',
    },
  });

  const onSubmit: SubmitHandler<SidebarFormValues> = data => {
    const { search } = data;
    if (search.trim()) {
      /** NOTICE:
       * https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#setting-custom-body-fields-per-request
       */
      sendMessage({ text: search }, { body: { model: data.llmModel } });
      methods.setValue('search', '');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MainLayout>
          <TitleLayout>
            <Title />
          </TitleLayout>
          <InputLayout>
            <SearchInput />
          </InputLayout>
          <Divider />
          <MessagesChatLayout>
            <Snippet code='git clone https://github.com/user/repo'>
              <SnippetInput />
              <SnippetAddon align='inline-end'>
                <SnippetCopyButton />
              </SnippetAddon>
            </Snippet>
            <ChatMessagesRoot
              addToolOutput={addToolOutput}
              messages={messages}
            />
          </MessagesChatLayout>
        </MainLayout>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          sx={{ alignSelf: 'flex-start', mt: 2 }}
        >
          Искать
        </Button>
      </Form>
    </FormProvider>
  );
}
