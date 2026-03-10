import { useQuery } from '@tanstack/react-query';

export function useSidebarStore() {
  console.log('useSidebarStore');
  return {};
}

export function useSidebarApi() {
  const query = useQuery({
    queryKey: ['sidebar', 'api'],
    queryFn: async () => {
      return Promise.resolve('boolean');
    },
  });

  return query
}
