// Sidebar.tsx
import { Button, Divider } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import { useWatch } from 'react-hook-form';
import { useGetModelsList, useOurChat } from '@contextprism/ai-api';
import { SidebarLayout } from './ui/SidebarLayout';
import { ToggleLlmModel } from '../features/ToggleModel';
import { SidebarForm } from './Sidebar.Form';
import { SearchInput } from '../features/SearchInput';

interface SidebarProps {
  model?: string;
}

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export function Sidebar({}: SidebarProps) {
  const { data } = useGetModelsList();

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
