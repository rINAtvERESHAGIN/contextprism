import type { SystemModelMessage } from "ai";

export const BASE_SYSTEM_PROMPT: SystemModelMessage = {
  role: 'system',
  content: 'Ты умный ассистент, отвечай на вопросы строго и вежливо! ',
};
