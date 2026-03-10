import { useGetModelsList, useOurChat } from '@contextprism/ai-fetch';
import {
  Snippet,
  SnippetInput,
  SnippetAddon,
  SnippetCopyButton,
  ConversationComponent,
} from '@contextprism/ai-uikit';
import { Divider, Button } from '@mui/material';
import { useEffect } from 'react';
import { Title } from '../entities/Title.Sidebar';
import { SearchInput } from '../features/SearchInput';
import { ToggleLlmModel } from '../features/ToggleModel';
import { SidebarForm } from './Sidebar.Form';
import { SidebarLayout } from './ui/SidebarLayout';
import '@contextprism/ai-uikit/style.css'

interface SidebarProps {
  model?: string;
}

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export function Sidebar({}: SidebarProps) {
  const { data } = useGetModelsList();

  useEffect(() => {
    console.log('data fetched', data);
  }, [data]);

  const { messages, sendMessage, status, addToolOutput } = useOurChat();

  function handleOnSubmitForm(searchAiInput: string, confermedModel: string) {
    sendMessage({ text: searchAiInput }, { body: { model: confermedModel } });
  }

  useEffect(() => {
    console.log('messages', messages);
  }, [messages]);

  return (
    <div className='bg-red-400 p-4 rounded-3xl'>
      <SidebarForm onSubmit={handleOnSubmitForm}>
        <Snippet code='git clone https://github.com/user/repo'>
          <SnippetInput />
          <SnippetAddon align='inline-end'>
            <SnippetCopyButton />
          </SnippetAddon>
        </Snippet>
        <SidebarLayout>
          <SidebarLayout.TitleLayout>
            <Title />
            {data && Array.isArray(data) && data.length > 0 && (
              <ToggleLlmModel name='llmModel' models={data} />
            )}
          </SidebarLayout.TitleLayout>
          <SidebarLayout.InputLayout>
            <SearchInput />
          </SidebarLayout.InputLayout>
          <Divider />
          <SidebarLayout.MessagesChatLayout>
            <ConversationComponent messages={messages} />
          </SidebarLayout.MessagesChatLayout>
        </SidebarLayout>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          sx={{ alignSelf: 'flex-start', mt: 2 }}
        >
          Искать
        </Button>
      </SidebarForm>
    </div>
  );
}
