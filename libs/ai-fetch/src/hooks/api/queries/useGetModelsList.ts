import { useQuery } from '@tanstack/react-query';

export const useGetModelsList = () => {
  const query = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await fetch('/hono/api/llm/models');

      if (!response.ok) {
        throw new Error('Getting Error while Fetching models list');
      }

      return await response.json();
    },
    select(data) {
      // console.log('select:::data:::', data);
      return Array.isArray(data.models)
        ? data.models.reduce(
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
          )
        : [];
    },
  });

  return query;
};
