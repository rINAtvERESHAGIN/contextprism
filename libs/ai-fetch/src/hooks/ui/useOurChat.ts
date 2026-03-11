import { useChat, UseChatOptions } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
  UIDataTypes,
  UIMessage,
  UITools,
} from 'ai';

export type ChatOptions = UseChatOptions<
  UIMessage<unknown, UIDataTypes, UITools>
>;

export const useCh = useChat;

export function useOurChat(
  rest: UseChatOptions<UIMessage<unknown, UIDataTypes, UITools>>
) {

const cc = useChat()
  const chat = useChat(
    {
      transport: new DefaultChatTransport({
        api: '/hono/api/llm/chat',
      }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      ...rest,
    },
    async () => {
      console.warn('Check, its empty func in useChat called hook');
    }
  );

  return chat;
}
