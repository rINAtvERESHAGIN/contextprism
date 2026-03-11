import z from 'zod';
import { tool as createTool } from 'ai';

// Ответ
// {"name": "callSayHi", "parameters": {"cmd": {"type": "string", "description": "привет"}}}

export const toolsTodoApp = {
  callSayHi: {
    description: 'вывести приветствие',
    inputSchema: z.object({
      message: z.string().describe('приветственное сообщение'), // переименовал для соответствия параметру от LLM
    }),
    execute: async ({ message }) => {
      // Серверный лог (не попадёт в чат)
      console.log('Приветствие от инструмента:', message);

      // Возвращаем объект, который будет передан в UI
      return {
        type: 'greeting',
        text: message,
        timestamp: new Date().toISOString(),
      };
    },
  },
  // server-side tool with execute function:
  // getWeatherInformation: createTool({
  //   description: 'Отобразить погоду для определенного места.',
  //   inputSchema: z.object({
  //     location: z.string().describe('Место, где можно получить прогноз погоды для'),
  //   }),
  //   execute: async function ({ location }) {
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     return { weather: 'Солнечно', temperature: 75, location };
  //   },
  // }),
  // // client-side tool that starts user interaction:
  // askForConfirmation: createTool({
  //   description: 'Ask the user for confirmation.',
  //   inputSchema: z.object({
  //     message: z.string().describe('The message to ask for confirmation.'),
  //   }),
  // }),
  // // client-side tool that is automatically executed on the client:
  // getLocation: createTool({
  //   description:
  //     'Get the user location. Always ask for confirmation before using this tool.',
  //   inputSchema: z.object({}),
  // }),
};
