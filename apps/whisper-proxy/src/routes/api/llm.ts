import { Hono } from 'hono';
import { createOllama, streamText } from 'ai-sdk-ollama';
import { z } from 'zod';
import { createSystemContextPrompt } from '../../lib/utils/createSystemContextPrompt';
import {
  convertToModelMessages,
  UIMessage,
  streamText as streamTextAi,
} from 'ai';

type Body = Parameters<typeof streamText>[number];
type Message = NonNullable<Body['messages']>[0];

type MessageMap = {
  [K in Message as Lowercase<K['role']>]: K;
};

const BASE_URL = 'http://192.168.1.17:11434';
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
app.get('/models', async c => {
  const response = await fetch(`${BASE_URL}/api/tags`);
  const data = await response.json();

  return c.json(data);
});
app.post('/chat', async ({ req }) => {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamTextAi({
    // model: ollama('gemma3:1b'),
    // model: ollama('qwen3-vl:8b'),
    model: ollama('llama3.2:3b'),
    messages: await convertToModelMessages(messages),
    system: [
      {
        role: 'system',
        content:
          'Всегда отвечай на русском языке, можно использовать англицизмы и не переводимые слова!',
      },
      {
        role: 'system',
        content: [
          'Ты отвечаешь **максимально кратко и прямо**.',
          'Запрещено:',
          '- использовать <think>',
          '- писать внутренние рассуждения',
          '- объяснять ход мыслей',
          '- писать Давай подумаем',
          'Сначала разберёмся и любые преамбулы',
          'Отвечай **только финальным ответом**, без единого лишнего слова.',
          'Начинай сразу с сути.',
        ].join('\n'),
      },
      {
        role: 'system',
        content: [
          'Ты — полезный и точный помощник.',
          'Отвечай **исключительно** в хорошо структурированном Markdown.\n',
          '\n',
          'Обязательные правила:\n',
          '\n',
          '- Начинай ответ с заголовка ## (например ## Ответ, ## Решение, ## Объяснение)',
          '- Используй ### для подзаголовков',
          '- **Жирный** — для важных слов и терминов',
          '- *Курсив* — для выделения мыслей или названий',
          '- Нумерованные списки — для шагов и последовательностей',
          '- Маркированные списки — для перечислений',
          '- Таблицы — когда нужно сравнивать или показывать данные',
          '- **Код, команды, JSON, конфиги** — всегда внутри fenced блоков с указанием языка:',
          '',
          '```typescript',
          '// пример',
          'const x = 10;',
          '```',
          '',
          '```bash',
          'npm install ai',
          '```',
          '',
          '- Никогда не пиши код без указания языка после ```',
          '- Не используй тройные обратные кавычки внутри других тройных кавычек',
          '- Не добавляй вступительные фразы типа «Конечно», «Вот ответ», «Я думаю»',
          '- Если ответ длинный — разбивай на логические блоки с заголовками',
          '',
          'Отвечай строго по этим правилам.',
        ].join('\n'),
      },
    ],
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

export { app as llm };
