import { ChatUi } from '..';
import { ChatProvider } from './chat.provider';

export const AiChat = () => (
  <ChatProvider>
    <ChatUi />
  </ChatProvider>
);
