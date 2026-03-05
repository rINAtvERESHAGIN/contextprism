import type { SystemModelMessage } from 'ai';
import { BASE_SYSTEM_PROMPT } from '../configs/constants/BASE_SYSTEM_PROMPT.js';

export function createSystemContextPrompt(
  systemContext: string[]
): SystemModelMessage | SystemModelMessage[] {
  if (systemContext.length === 0) return BASE_SYSTEM_PROMPT;
  return [
    BASE_SYSTEM_PROMPT,
    ...systemContext.map(
      (str): SystemModelMessage => ({ role: 'system', content: str })
    ),
  ];
}
