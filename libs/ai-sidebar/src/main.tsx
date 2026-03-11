import { ChatProvider } from '@contextprism/ai-chat';
import { Sidebar } from './app/Sidebar';
import './style.css';
import { DialogExampel } from '@contextprism/ai-components';

export function AiSidebar() {
  return (
    // <ChatProvider>
      <DialogExampel />
      // {/* <Sidebar /> */}
    // </ChatProvider>
  );
}
