import { ChatProvider } from './chat.provider';
import { ChatUi } from './chat.ui';

export const AiChat = () => (
  <ChatProvider>
    <ChatUi />
  </ChatProvider>
);
