import z from 'zod';

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
  getWeather: {
    description: 'Получить текущую погоду для указанного города',
    inputSchema: z.object({
      city: z.string().describe('Название города'),
    }),
    execute: async ({ city }) => {
      // Здесь можно сделать реальный запрос к API погоды
      const weather = `Солнечно, +22°C в городе ${city}`;
      return weather;
    },
  },
};
