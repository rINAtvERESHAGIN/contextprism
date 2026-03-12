import { InputPrompt } from '../entities/InputPrompt/InputPrompt';
import { Conversation } from '../entities/Conversation/Conversation';
import { useChatCtx } from './chat.provider';
import { Layout } from '../entities/Layout/Layout';

export function ChatUi() {
  const { models, messages } = useChatCtx();
  return (
    <Layout>
      <Conversation messages={messages} />
      <InputPrompt models={models} />
    </Layout>
  );
}
