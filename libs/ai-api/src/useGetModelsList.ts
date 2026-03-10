import { useQuery } from '@tanstack/react-query';
import { GetModelsList } from './request.get.models.js';

export function useGetModelsList() {
  // const query = useQuery({
  //   queryKey: ['models'],
  //   queryFn: GetModelsList,
  //   select(data) {
  //     return Array.isArray(data.models) ? data.models : [];
  //   },
  // });

  // return query;
  {
    data: 'data';
  }
}
