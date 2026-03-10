import { Message } from './Message';
import { ToolResult } from './ToolResult';

export interface LLMFinalResponse {
  requestId: string;
  assistantMessage?: Message; // final assistant message
  toolResults?: ToolResult[];
  traceId?: string;
  warnings?: string[];
}
