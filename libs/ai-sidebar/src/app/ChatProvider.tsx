import { ChatOptions } from '@contextprism/ai-fetch';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls, UIMessage
} from 'ai';

interface ICtxValue {
  messages: UIMessage[];
  addToolOutput: (
    options:
      | { tool: string; toolCallId: string; output: unknown }
      | {
          tool: string;
          toolCallId: string;
          state: 'output-error';
          errorText: string;
        }
  ) => void;
  addToolApprovalResponse: (options: {
    id: string;
    approved: boolean;
    reason?: string;
  }) => void | PromiseLike<void>;
}

const ChatAccessCtx = createContext<ICtxValue | undefined>(undefined);

const DEFAULT_CHAT_TOOLS_SETTING: Pick<ChatOptions, 'onToolCall'> = {
  onToolCall: async ({ toolCall }) => {
    // toolCall содержит: toolName, args, toolCallId
    switch (toolCall.toolName) {
      case 'sendEmail': {
        // Например, показываем модальное окно с подтверждением
        const confirmed = window.confirm(
          `Отправить email на ${toolCall.args.to} с темой "${toolCall.args.subject}"?`
        );
        if (confirmed) {
          // Имитация отправки (здесь можно вызвать реальный API)
          const result = `Email отправлен ${toolCall.args.to}`;
          // Возвращаем результат модели через addToolResult
          chat.addToolOutput({
            toolCallId: toolCall.toolCallId,
            output: result,
          });
        } else {
          // Если пользователь отказался, можно вернуть ошибку или отмену
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
};

function ChatProvider({ children }: PropsWithChildren) {
  const { messages, addToolOutput, addToolApprovalResponse } = useChat(
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
              addToolOutput({
                toolCallId: toolCall.toolCallId,
                output: result,
              });
            } else {
              addToolOutput({
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

  const value = useMemo(() => {
    return { messages, addToolOutput, addToolApprovalResponse };
  }, []);

  return <ChatAccessCtx value={undefined}>{children}</ChatAccessCtx>;
}
