import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';

export const useOChat = () => {
  const chat = useChat(
    {
      transport: new DefaultChatTransport({
        api: '/hono/api/llm/chat',
      }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      onToolCall: async ({ toolCall }) => {
        switch (toolCall.toolName) {
          case 'sendEmail': {
            const confirmed = window.confirm(
              `Отправить email на ${toolCall.args.to} с темой "${toolCall.args.subject}"?`
            );
            if (confirmed) {
              const result = `Email отправлен ${toolCall.args.to}`;
              chat.addToolOutput({
                toolCallId: toolCall.toolCallId,
                output: result,
              });
            } else {
              chat.addToolOutput({
                toolCallId: toolCall.toolCallId,
                output: 'Пользователь отменил отправку',
              });
            }
            break;
          }
          default:
            console.warn('Неизвестный инструмент:', toolCall.toolName);
        }
      },
    },
    async () => {
      console.warn('Check, its empty func in useChat called hook');
    }
  );

  return chat;
};
