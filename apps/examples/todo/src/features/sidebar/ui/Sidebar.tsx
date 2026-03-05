// Sidebar.tsx
import { useEffect, useRef } from 'react';
import { Button, Divider } from '@mui/material';
import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { Title } from './Title.Sidebar';
import styled from 'styled-components';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { SearchInput } from '../form/SearchInput';
import { ChatMessagesRoot } from '../../../../../../../libs/ui/chat/src/entities/ChatMessagesRoot/ChatMessagesRoot';
import { Snippet, SnippetAddon, SnippetCopyButton, SnippetInput } from '@contextprism/aiui';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, addToolOutput } = useChat({
    transport: new DefaultChatTransport({
      api: '/hono/api/llm/chat',
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    async onToolCall({ toolCall }) {
      // Check if it's a dynamic tool first for proper type narrowing
      if (toolCall.dynamic) {
        return;
      }

      if (toolCall.toolName === 'getLocation') {
        const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];

        // No await - avoids potential deadlocks
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

  const llmModel = useWatch({ name: 'llmModel', control: methods.control });

  const onSubmit: SubmitHandler<SidebarFormValues> = data => {
    console.log('on submit', data);
    const { search } = data;
    console.log(search, 'on submit');
    if (search.trim()) {
      /**
       * https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#setting-custom-body-fields-per-request
       */
      sendMessage({ text: search }, { body: { model: data.llmModel } });
      methods.setValue('search', '');
    }
  };

  useEffect(() => {
    console.log('llmModel', llmModel);
  }, [llmModel]);

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
            {/* <MessageList addToolOutput={addToolOutput} messages={messages} /> */}
            <div ref={scrollRef} />
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
