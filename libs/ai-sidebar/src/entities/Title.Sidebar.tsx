import { Typography } from '@mui/material';

export function Title() {
  return (
    <div className='flex flex-row gap-1.5'>
      <Typography variant='h6' fontWeight='bold' noWrap>
        AI Assistant
      </Typography>
    </div>
  );
}
