// Sidebar.tsx
import { Button, Divider } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import { useGetModelsList, useMod, useOurChat } from '@contextprism/ai-api';
import { SidebarLayout } from './ui/SidebarLayout';
import { ToggleLlmModel } from '../features/ToggleModel';
import { SidebarForm } from './Sidebar.Form';
import { SearchInput } from '../features/SearchInput';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSidebarStore } from './store';

interface SidebarProps {
  model?: string;
}

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export const useGetsList = () => {
  // return {data:'data:::useGetModelsList'}
  const query = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await fetch('/hono/api/llm/models');

      if (!response.ok) {
        throw new Error('Getting Error while Fetching models list');
      }

      return await response.json();
    },
    select(data) {
      console.log('select:::data:::', data);
      return Array.isArray(data.models) ? data.models : [];
    },
  });

  return query;
};

export function Sidebar({}: SidebarProps) {
  
  const { data } = useGetsList();

  useEffect(() => {
    console.log('data fetched', data);
  }, [data]);

  // const { messages, sendMessage, status, addToolOutput } = useOurChat();

  function handleOnSubmitForm(searchAiInput: string, confermedModel: string) {
    setLastUserLLM(searchAiInput)
    // sendMessage({ text: searchAiInput }, { body: { model: confermedModel } });
  }

  return (
    <SidebarForm onSubmit={handleOnSubmitForm}>
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
          {/* <ChatMessagesRoot
              addToolOutput={addToolOutput}
              messages={messages}
            /> */}
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
  );
}
