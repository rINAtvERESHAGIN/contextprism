import { Message } from './Message';

export interface LLMChatRequest {
  requestId: string;
  userId: string;
  messages: Message[]; // conversation history (client-side should keep)
  clientContext?: Record<string, any>;
  idempotencyKey?: string;
}
