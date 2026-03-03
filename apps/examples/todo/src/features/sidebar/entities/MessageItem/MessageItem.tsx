import { motion } from 'framer-motion';
import { MessageBubble } from '../Bubble/Bubble';

import { cn } from '../../../../shared/tools';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { UIMessage } from 'ai';

export function MessageItem({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'mb-5к flex gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
      layout
    >
      {!isUser && (
        <Avatar
          sx={{ width: 24, height: 24, bgcolor: deepPurple[500] }}
          className='mt-1'
          src='/ai.png'
        ></Avatar>
      )}

      <MessageBubble message={message} />

      {isUser && (
        <Avatar
          sx={{ width: 24, height: 24 }}
          className='mt-1'
          src='/user.png'
        ></Avatar>
      )}
    </motion.div>
  );
}
