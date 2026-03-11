Вот перевод предоставленного текста на русский язык с сохранением всей стилизации, форматирования, заголовков, кода и структуры:

# Генеративные пользовательские интерфейсы

Генеративные пользовательские интерфейсы (**generative UI**) — это процесс, при котором большая языковая модель (LLM) выходит за рамки простого текста и **«генерирует интерфейс»**. Это создаёт более увлекательный и по-настоящему AI-native опыт для пользователей.

<WeatherSearch />

В основе генеративного UI лежат **[инструменты](/docs/ai-sdk-core/tools-and-tool-calling)** — функции, которые вы предоставляете модели, чтобы она могла выполнять специализированные задачи, например получать погоду в определённом месте. Модель сама решает, когда и как использовать эти инструменты, исходя из контекста беседы.

Генеративный UI — это процесс связи результатов вызова инструмента с React-компонентом. Вот как это работает:

1. Вы передаёте модели промпт или историю переписки, а также набор инструментов.
2. В зависимости от контекста модель может решить вызвать инструмент.
3. Если инструмент вызван — он выполняется и возвращает данные.
4. Эти данные затем передаются в React-компонент для отрисовки.

Передавая результаты работы инструментов в React-компоненты, вы можете создать генеративный интерфейс, который более увлекателен и адаптивен под ваши потребности.

## Создание чат-интерфейса с генеративным UI

Давайте создадим чат-интерфейс, который умеет вести текстовые диалоги и добавлять динамические элементы UI на основе ответов модели.

### Базовая реализация чата

Начнём с простой реализации чата с использованием хука `useChat`:

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role === 'user' ? 'User: ' : 'AI: '}</div>
          <div>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }
              return null;
            })}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

Для обработки запросов чата и ответов модели настроим API-маршрут:

```ts
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
__PROVIDER_IMPORT__;

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: __MODEL__,
    system: 'You are a friendly assistant!',
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
```

Этот маршрут использует функцию `streamText` для обработки сообщений чата и потоковой передачи ответов модели обратно на клиент.

### Создание инструмента

Прежде чем улучшать чат-интерфейс динамическими элементами UI, нужно создать инструмент и соответствующий React-компонент. Инструмент позволит модели выполнять конкретное действие, например получать информацию о погоде.

Создайте файл `ai/tools.ts` со следующим содержимым:

```ts
import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

export const tools = {
  displayWeather: weatherTool,
};
```

В этом файле создан инструмент `weatherTool`. Он имитирует получение данных о погоде для указанного места. После 2-секундной задержки возвращаются тестовые данные. В реальном приложении вместо имитации следует сделать настоящий запрос к погодному API.

### Обновление API-маршрута

Обновим маршрут API, чтобы он использовал созданный инструмент:

```ts
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
__PROVIDER_IMPORT__;
import { tools } from '@/ai/tools';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: __MODEL__,
    system: 'You are a friendly assistant!',
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}
```

Теперь, когда инструмент определён и добавлен в вызов `streamText`, создадим React-компонент для отображения погоды.

### Создание UI-компонентов

Создайте файл `components/weather.tsx`:

```tsx
type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  return (
    <div>
      <h2>Current Weather for {location}</h2>
      <p>Condition: {weather}</p>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};
```

Этот компонент отображает информацию о погоде. Он принимает три пропса: `temperature`, `weather` и `location` — ровно то, что возвращает `weatherTool`.

### Отрисовка компонента погоды

Теперь интегрируем инструмент и компонент в интерфейс чата. Компонент `Weather` будет отображаться, когда модель вызовет инструмент погоды.

Чтобы понять, вызвала ли модель инструмент, проверяем массив `parts` объекта `UIMessage`. В AI SDK 5.0 части инструментов имеют типизированные имена вида `tool-${toolName}`.

Обновим файл `page.tsx`:

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Weather } from '@/components/weather';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role === 'user' ? 'User: ' : 'AI: '}</div>
          <div>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }
              if (part.type === 'tool-displayWeather') {
                switch (part.state) {
                  case 'input-available':
                    return <div key={index}>Loading weather...</div>;
                  case 'output-available':
                    return (
                      <div key={index}>
                        <Weather {...part.output} />
                      </div>
                    );
                  case 'output-error':
                    return <div key={index}>Error: {part.errorText}</div>;
                  default:
                    return null;
                }
              }
              return null;
            })}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

В обновлённом коде мы:

1. Вручную управляем состоянием ввода через `useState`
2. Используем `sendMessage` вместо встроенного обработчика
3. Проверяем массив `parts` на разные типы контента
4. Обрабатываем части инструмента с типом `tool-displayWeather` и разными состояниями (`input-available`, `output-available`, `output-error`)

Такой подход позволяет динамически отрисовывать UI-компоненты в зависимости от ответов модели, создавая более интерактивный и контекстно-зависимый чат.

## Расширение приложения с генеративным UI

Вы можете улучшить чат-приложение, добавляя новые инструменты и компоненты, делая пользовательский опыт богаче и универсальнее.

### Добавление новых инструментов

Просто определите дополнительные инструменты в файле `ai/tools.ts`:

```ts
// Добавляем инструмент для акций
export const stockTool = createTool({
  description: 'Get price for a stock',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get the price for'),
  }),
  execute: async function ({ symbol }) {
    // Имитация API-запроса
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { symbol, price: 100 };
  },
});

// Обновляем объект tools
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
};
```

Создайте файл `components/stock.tsx`:

```tsx
type StockProps = {
  price: number;
  symbol: string;
};

export const Stock = ({ price, symbol }: StockProps) => {
  return (
    <div>
      <h2>Stock Information</h2>
      <p>Symbol: {symbol}</p>
      <p>Price: ${price}</p>
    </div>
  );
};
```

И обновите `page.tsx`, добавив поддержку нового компонента:

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Weather } from '@/components/weather';
import { Stock } from '@/components/stock';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role}</div>
          <div>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }
              if (part.type === 'tool-displayWeather') {
                switch (part.state) {
                  case 'input-available':
                    return <div key={index}>Loading weather...</div>;
                  case 'output-available':
                    return (
                      <div key={index}>
                        <Weather {...part.output} />
                      </div>
                    );
                  case 'output-error':
                    return <div key={index}>Error: {part.errorText}</div>;
                  default:
                    return null;
                }
              }
              if (part.type === 'tool-getStockPrice') {
                switch (part.state) {
                  case 'input-available':
                    return <div key={index}>Loading stock price...</div>;
                  case 'output-available':
                    return (
                      <div key={index}>
                        <Stock {...part.output} />
                      </div>
                    );
                  case 'output-error':
                    return <div key={index}>Error: {part.errorText}</div>;
                  default:
                    return null;
                }
              }
              return null;
            })}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

Следуя этому шаблону, вы можете продолжать добавлять новые инструменты и компоненты, расширяя возможности вашего приложения с генеративным интерфейсом.
