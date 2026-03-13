Ошибка возникает из-за несовместимости формата запроса: библиотека `ai` отправляет данные в формате **Responses API** (новый API OpenAI), а ваш локальный сервер vLLM ожидает стандартный **Chat Completions API** (как у OpenAI). Это видно по URL `http://10.12.1.73:8100/v1/responses` в логах ошибки.

Сервер vLLM возвращает 500 Internal Server Error с сообщением `'role'`, что указывает на невозможность разобрать поле `role` в непривычной структуре (с `parts`, `step-start` и т.д.), характерной для Responses API.

## Решение

### 1. Явно используйте Chat Completions модель
В коде обработчика замените:
```js
model: openapi(model),
```
на
```js
model: openapi.chat(model),
```
Это заставит SDK использовать endpoint `/v1/chat/completions` вместо `/v1/responses`.

### 2. Упростите преобразование сообщений
`convertToModelMessages` не нужен при использовании `streamText` – он сам преобразует `UIMessage` в нужный формат. Уберите этот вызов:
```js
messages: await convertToModelMessages(messages), // удалите эту строку
```
Передавайте `messages` напрямую:
```js
messages: messages,
```

### Итоговый исправленный код
```js
import { Hono } from 'hono';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const OPEN_API_LAB = 'http://10.12.1.73:8100/v1';
const vllm = new Hono();

const openapi = createOpenAI({
  baseURL: OPEN_API_LAB,
  apiKey: 'API-Key-with--', // или используйте headerValue
});

vllm.post('/chat', async ({ req, json }) => {
  console.log('GET START STREAM CHAT');
  const { messages, model }: { messages: UIMessage[]; model: string } = await req.json();

  const result = streamText({
    model: openapi.chat(model),    // явно указываем chat completions
    messages: messages,            // без дополнительного преобразования
    chat_template_kwargs: { enable_thinking: false },
  });

  return result.toUIMessageStreamResponse();
});
```

## Почему это работает
- `openapi.chat(model)` гарантирует использование стандартного Chat Completions API, который поддерживается vLLM.
- `streamText` самостоятельно приводит `UIMessage` к формату, понятному vLLM (объекты с `role` и `content`).
- Убирается лишняя обёртка, которая могла создавать неожиданные поля.

Если после изменений ошибка сохранится, проверьте:
- Версию vLLM – должна поддерживать OpenAI‑совместимый эндпоинт `/v1/chat/completions`.
- Что `messages` не содержат специфических полей, добавленных фронтендом (например, `providerMetadata`). При необходимости можно отфильтровать их перед отправкой.
