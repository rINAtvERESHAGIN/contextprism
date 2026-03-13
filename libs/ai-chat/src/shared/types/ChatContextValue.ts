import { ModelUi } from '@contextprism/ai-components';
import { UIMessage, FileUIPart, CreateUIMessage, ChatRequestOptions } from 'ai';

export type CtxModels = Record<string, ModelUi>;
export interface ICtxValue {
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
