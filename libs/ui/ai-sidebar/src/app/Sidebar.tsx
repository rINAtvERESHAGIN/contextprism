// Sidebar.tsx
import { useEffect, useRef } from 'react';
import { Button, Divider } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import styled from 'styled-components';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { SearchInput } from '../form/SearchInput';
import { useGetModelsList, useOurChat } from '@contextprism/aiApiSdk';
import { SidebarLayout } from './ui/SidebarLayout';
import { ToggleLlmModel } from '../features/ToggleModel';
import { SidebarForm } from './Sidebar.Form';

interface SidebarProps {
  // Можно передать open и onClose, если нужен временный режим
  // Для постоянного сайдбара эти пропсы не нужны
}

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export function Sidebar({}: SidebarProps) {
  const { data } = useGetModelsList();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, addToolOutput } = useOurChat();

  const llmModel = useWatch({ name: 'llmModel', control: methods.control });

  function handleOnSubmitForm(searchAiInput: string, confermedModel: string) {
    sendMessage({ text: searchAiInput }, { body: { model: confermedModel } });
  }

  return (
    <SidebarForm onSubmit={handleOnSubmitForm}>
      <SidebarLayout>
        <SidebarLayout.TitleLayout>
          <Title />
          <ToggleLlmModel name='llmModel' models={data} />
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
