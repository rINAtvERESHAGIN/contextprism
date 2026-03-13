import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useGetModelsList } from '@contextprism/ai-fetch';
import { useChatStore } from './chat.store';
import { ICtxValue } from '../shared/types/ChatContextValue';
import { useOChat } from './chat.ai-hook';
import { BackendSuffix } from '@contextprism/ai-fetch';

export const GLOBAL_CHAT_BACKEND_PREFIX: BackendSuffix = 'vllm';

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
  const { data: models } = useGetModelsList(GLOBAL_CHAT_BACKEND_PREFIX);
  //ai
  const {
    status,
    messages,
    sendMessage,
    addToolOutput,
    addToolApprovalResponse,
  } = useOChat(GLOBAL_CHAT_BACKEND_PREFIX);
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
      GLOBAL_CHAT_BACKEND_PREFIX,
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
    GLOBAL_CHAT_BACKEND_PREFIX,
  ]);

  return <ChatAccessCtx value={value}>{children}</ChatAccessCtx>;
}
