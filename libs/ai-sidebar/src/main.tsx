import { ChatProvider } from '@contextprism/ai-chat';
import { Sidebar } from './app/Sidebar';
import './style.css';

export function AiSidebar() {
  return (
    <ChatProvider>
      <Sidebar />
    </ChatProvider>
  );
}
