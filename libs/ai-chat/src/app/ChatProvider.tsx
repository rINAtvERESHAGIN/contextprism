import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ChatRequestOptions, CreateUIMessage, FileUIPart, UIMessage } from 'ai';
import { useOChat } from './chat';

interface ICtxValue {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
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

  sendMessage: (
    message?:
      | {
          text: string;
          files?: FileList | FileUIPart[];
          metadata?;
          messageId?: string;
        }
      | CreateUIMessage,
    options?: ChatRequestOptions
  ) => Promise<void>;
}

const ChatAccessCtx = createContext<ICtxValue | undefined>(undefined);

export function ChatProvider({ children }: PropsWithChildren) {
  const {
    status,
    messages,
    sendMessage,
    addToolOutput,
    addToolApprovalResponse,
  } = useOChat();

  const value = useMemo(() => {
    return {
      status,
      messages,
      sendMessage,
      addToolOutput,
      addToolApprovalResponse,
    };
  }, []);

  return <ChatAccessCtx value={value}>{children}</ChatAccessCtx>;
}

export function useChatCtx() {
  const context = useContext(ChatAccessCtx);

  if (!context) throw new Error('Must be in scope of ChatAccessCtx');
  
  return context;
}
