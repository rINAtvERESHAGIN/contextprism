import { useGetModelsList, useOurChat } from '@contextprism/ai-fetch';
import { ConversationComponent } from '@contextprism/ai-components';
import { Divider, Button } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import { SearchInput } from '../features/SearchInput';
import { ToggleLlmModel } from '../features/ToggleModel';
import { SidebarForm } from './Sidebar.Form';
import { SidebarLayout } from './ui/SidebarLayout';

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

  function handleOnSubmitForm(searchAiInput: string, confermedModel: string) {
    sendMessage({ text: searchAiInput }, { body: { model: confermedModel } });
  }

  return (
    <div className='bg-red-300 p-4 rounded-3xl'>
      <SidebarForm onSubmit={handleOnSubmitForm}>
        <SidebarLayout>
           <SidebarLayout.TitleLayout>
            <Title />
            {data && Array.isArray(data) && data.length > 0 && (
              <ToggleLlmModel name='llmModel' models={data} />
            )}
          </SidebarLayout.TitleLayout>
          <Divider />
          <SidebarLayout.InputLayout>
            <SearchInput />
          </SidebarLayout.InputLayout>

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
