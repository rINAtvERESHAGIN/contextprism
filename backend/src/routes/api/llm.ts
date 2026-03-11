import { Hono } from 'hono';
import { createOllama, streamText } from 'ai-sdk-ollama';
import { z } from 'zod';
import { createSystemContextPrompt } from '../../lib/utils/createSystemContextPrompt';
import {
  convertToModelMessages,
  UIMessage,
  streamText as streamTextAi,
} from 'ai';
import { systemPromtsBase } from '../../configs/system.promts';
import { toolsTodoApp } from '../../tools';

type Body = Parameters<typeof streamText>[number];
type Message = NonNullable<Body['messages']>[0];

type MessageMap = {
  [K in Message as Lowercase<K['role']>]: K;
};

const BASE_URL = 'http://192.168.1.8:11434';
// Schema
const requestBodySchema = z.object({
  userMessage: z.string().min(1, {
    message: 'User message is required and must be a non-empty string',
  }),
  systemContext: z.array(z.string()).min(1, {
    message: 'System context is required and must be a non-empty string',
  }),
});

export type RequestBody = z.infer<typeof requestBodySchema>;

const app = new Hono();
const ollama = createOllama({ baseURL: BASE_URL });

// Define the POST route: /hono/api/llm/chat
app.post('/chat', async ({ req }) => {
  const { messages, model }: { messages: UIMessage[]; model: string } =
    await req.json();

  // const system = [...Object.values(systemPromtsBase)];
  // const system = [
  //   systemPromtsBase['speak-russian'],
  //   systemPromtsBase['useful-assistant'],
  // ];

  const result = streamTextAi({
    model: ollama(model),
    messages: await convertToModelMessages(messages),
    // tools: {
    //   // Пример инструмента, выполняющегося на сервере (получение погоды)
    //   getWeather: {
    //     description: 'Получить текущую погоду для указанного города',
    //     parameters: z.object({
    //       city: z.string().describe('Название города'),
    //     }),
    //     execute: async ({ city }) => {
    //       // Здесь можно сделать реальный запрос к API погоды
    //       const weather = `Солнечно, +22°C в городе ${city}`;
    //       return weather;
    //     },
    //   },
    //   // Пример инструмента, который будет выполняться на клиенте (отправка email)
    //   sendEmail: {
    //     description: 'Отправить email получателю',
    //     parameters: z.object({
    //       to: z.string().email(),
    //       subject: z.string(),
    //       body: z.string(),
    //     }),
    //     // execute отсутствует — вызов будет отправлен клиенту
    //   },
    // },
    // tools: {...toolsTodoApp},
    // system,
  });

  return result.toUIMessageStreamResponse();
});
// Define the POST route: /hono/api/llm/messages
app.post('/messages', async c => {
  const body = await c.req.json();

  const validationResult = requestBodySchema.safeParse(body);
  if (!validationResult.success) {
    return c.json(
      {
        error: 'Invalid request body',
        details: z.treeifyError(validationResult.error),
      },
      400
    );
  }

  const { userMessage, systemContext } = validationResult.data;

  const messages: MessageMap['user'][] = [
    {
      role: 'user',
      content: [{ type: 'text', text: userMessage }],
    },
  ];

  const system = createSystemContextPrompt(systemContext);

  try {
    const result = await streamText({
      model: ollama('gemma3:1b'),
      messages,
      system,
      temperature: 1.15,
      topP: 0.92,
      topK: 40,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating text:', error);
    return c.json(
      {
        error: 'Failed to generate response from LLM',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
});

app.get('/models', async c => {
  const response = await fetch(`${BASE_URL}/api/tags`);
  const data = await response.json();

  return c.json(data);
});

export { app as llm };
