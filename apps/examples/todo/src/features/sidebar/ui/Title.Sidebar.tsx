import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ToggleLlmModel } from '../form/ToggleLlmModel';

export function Title() {
  const { data } = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      return fetch('/hono/api/llm/models').then(r => r.json());
    },
    select(data) {
      return Array.isArray(data.models) ? data.models : [];
    },
  });

  return (
    <div className='flex flex-row gap-1.5'>
      <Typography variant='h6' fontWeight='bold' noWrap>
        AI Assistant
      </Typography>
      <ToggleLlmModel name='llmModel' models={data} />
    </div>
  );
}
