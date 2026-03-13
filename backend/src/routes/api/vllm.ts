import { Hono } from 'hono';
import { convertToModelMessages, UIMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { toolsTodoApp } from '../../tools';
import { vllmClient } from '../../lib/clients';

export const OPEN_API_LAB = 'http://10.12.1.73:8100/v1';
const vllm = new Hono();

const headerValue = 'API-Key-with--';
const openapi = createOpenAI({
  baseURL: OPEN_API_LAB,
  apiKey: headerValue,
});

vllm.post('/chat', async ({ req }) => {
  const { messages, model }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model: openapi.chat(model),
    tools: { ...toolsTodoApp },
    system: [
      {
        role: 'system',
        content:
          'Ты умный, доброжелательный ассистент, готовый прийти на помощь! Важно давать ответы с правильным типом, для ответа или для рассуждений! также используй в ответах форматирование в markdown',
      },
      // {
      //   role: 'system',
      //   content:
      //     'когда ты думаешь или reasoning текст размышлений всегда должен быть CAPS LOCK!',
      // },
    ],
    messages: await convertToModelMessages(messages),
  });

  // return result.toTextStreamResponse();
  return result.toUIMessageStreamResponse({
    sendReasoning: false,
    sendSources: true,
  });
});

vllm.get('/models', async c => {
  const m = await vllmClient.showAvailableModelsV1ModelsGet();

  return c.json(m.data);
});

/* -------------------------------------------------------------------------- */
// ---Test
/* -------------------------------------------------------------------------- */

export { vllm };
