import { useQuery } from "@tanstack/react-query";


export const useGetModelsList = () => {
  // return {data:'data:::useGetModelsList'}
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
      return Array.isArray(data.models) ? data.models : [];
    },
  });

  return query;
};
