import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ChatRequestOptions, CreateUIMessage, FileUIPart, UIMessage } from 'ai';
import { useOChat } from './chat.ai-hook';
import { useGetModelsList } from '@contextprism/ai-fetch';
import { useChatStore } from './chat.store';
import { ModelUi } from '@contextprism/ai-components';

export type CtxModels = Record<string, ModelUi>;
interface ICtxValue {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  messages: UIMessage[];
  models: CtxModels | undefined;
  lastUserLLM: ModelUi | undefined;
  setLastUserLLM: (value: string) => void;
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

export function useChatCtx() {
  const context = useContext(ChatAccessCtx);

  if (!context) throw new Error('Must be in scope of ChatAccessCtx');

  return context;
}
/* -------------------------------------------------------------------------- */
// ---Provider
/* -------------------------------------------------------------------------- */
export function ChatProvider({ children }: PropsWithChildren) {
  //store
  const { lastUserLLM, setLastUserLLM } = useChatStore();
  //api
  const { data: models } = useGetModelsList();
  //ai
  const {
    status,
    messages,
    sendMessage,
    addToolOutput,
    addToolApprovalResponse,
  } = useOChat();
  //ctx memo value
  const value = useMemo(() => {
    return {
      status,
      messages,
      sendMessage,
      addToolOutput,
      addToolApprovalResponse,
      models,
      lastUserLLM,
      setLastUserLLM,
    };
  }, [
    status,
    messages,
    sendMessage,
    addToolOutput,
    addToolApprovalResponse,
    models,
    lastUserLLM,
    setLastUserLLM,
  ]);

  return <ChatAccessCtx value={value}>{children}</ChatAccessCtx>;
}
