import { InputPrompt } from '../entities/InputPrompt/InputPrompt';
import { Conversation } from '../entities/Conversation/Conversation';
import { useChatCtx } from './chat.provider';
import { Layout } from '../entities/Layout/Layout';
import {
  useMemo,
} from 'react';
import { ToggleLLMModel } from '../features/ToggleLLMModel/ToggleLLMModel';

export function ChatUi() {
  const { models, messages } = useChatCtx();

  const chatTools = useMemo(() => [ToggleLLMModel], []);

  return (
    <Layout>
      <Conversation messages={messages} />
      <InputPrompt
        models={models}
        // placeSlots={{ tools: [<ToggleLLMModel />] }}
        placeSlots={{ tools: chatTools }}
      />
    </Layout>
  );
}
