import { useQuery } from '@tanstack/react-query';

async function GetModelsList() {
  return fetch('/hono/api/llm/models').then(r => r.json());
}

export function useGetModelsList() {
  const query = useQuery({
    queryKey: ['models'],
    queryFn: GetModelsList,
    select(data) {
      return Array.isArray(data.models) ? data.models : [];
    },
  });

  return query;
}
export * from './lib/ai-api-sdk.js';
export * from './hooks/index.js';
