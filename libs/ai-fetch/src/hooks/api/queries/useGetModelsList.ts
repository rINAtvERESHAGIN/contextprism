import { useQuery } from '@tanstack/react-query';
import { BackendSuffix } from '../../../shared/types';

function createUiModelBySchema(
  ars: BackendSuffix,
  data: unknown[]
) {
  if (!Array.isArray(data) || data.length === 0) return [];
  switch (ars) {
    case 'vllm':
      return data.reduce(
        (acc, mo) => ({
          ...acc,
          [mo.id]: {
            id: mo.id,
            name: mo.root,
            chef: mo.owned_by,
            chefSlug: [mo.owned_by],
            providers: [],
          },
        }),
        {}
      );
    case 'llm':
      return data.reduce(
        (acc, mo) => ({
          ...acc,
          [mo.name]: {
            id: mo.name,
            name: mo.name,
            chef: mo.details.family,
            chefSlug: mo.details.family,
            providers: mo.details.families,
          },
        }),
        {}
      );
    default:
      return [];
  }
}

export const useGetModelsList = (ars: BackendSuffix) => {
  const query = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await fetch(`/hono/api/${ars}/models`);

      if (!response.ok) {
        throw new Error('Getting Error while Fetching models list');
      }

      return await response.json();
    },
    select(data) {
      switch (ars) {
        case 'vllm':
          return createUiModelBySchema('vllm', data.data);
        case 'llm':
          return createUiModelBySchema('llm', data.models);
        default:
          return [];
      }
    },
  });

  return query;
};
