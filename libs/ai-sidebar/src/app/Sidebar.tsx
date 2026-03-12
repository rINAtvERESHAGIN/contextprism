import { Divider } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import { SidebarLayout } from './ui/SidebarLayout';
import { ChatUi, useChatCtx } from '@contextprism/ai-chat';
import { useQuery } from '@tanstack/react-query';

interface SidebarProps {
  model?: string;
}

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

export function Sidebar({}: SidebarProps) {
  const { messages, sendMessage, status, addToolOutput } = useChatCtx();

  function handleOnSubmitForm(searchAiInput: string, confermedModel: string) {
    sendMessage({ text: searchAiInput }, { body: { model: confermedModel } });
  }

  return (
    <div className='bg-red-300 p-4 rounded-3xl h-full'>
      <SidebarLayout>
        <SidebarLayout.TitleLayout>
          <Title />
        </SidebarLayout.TitleLayout>
        <Divider />
        {/* <SidebarForm onSubmit={handleOnSubmitForm}> */}
        <ChatUi messages={messages} />
      </SidebarLayout>
      {/* <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          sx={{ alignSelf: 'flex-start', mt: 2 }}
        >
          Искать
        </Button>
      </SidebarForm> */}
    </div>
  );
}
