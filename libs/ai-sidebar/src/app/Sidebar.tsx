import { Divider } from '@mui/material';
import { Title } from '../entities/Title.Sidebar';
import { SidebarLayout } from './ui/SidebarLayout';
import { ChatUi } from '@contextprism/ai-chat';

export function Sidebar() {
  return (
    <div className='bg-red-300 p-4 rounded-3xl h-full'>
      <SidebarLayout>
        <SidebarLayout.TitleLayout>
          <Title />
        </SidebarLayout.TitleLayout>
        <Divider />

        <ChatUi />
      </SidebarLayout>
    </div>
  );
}
