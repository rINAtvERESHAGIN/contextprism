import { Hono } from 'hono';
import { createOllama, streamText } from 'ai-sdk-ollama';
import { z } from 'zod';
import { createSystemContextPrompt } from '../../lib/utils/createSystemContextPrompt';

type Body = Parameters<typeof streamText>[number];
type Message = NonNullable<Body['messages']>[0];

type MessageMap = {
  [K in Message as Lowercase<K['role']>]: K;
};

const BASE_URL = 'http://192.168.1.17:11434';

// Define the Zod schema for request body validation
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

// Define the POST route: /hono/api/chat/messages
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

export { app as llm };
