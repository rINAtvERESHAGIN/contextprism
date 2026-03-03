import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { MessageItem } from '../MessageItem/MessageItem';
import { UIMessage } from 'ai';

type MessageListProps = {
  messages: UIMessage[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <LayoutGroup>
      <AnimatePresence>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </LayoutGroup>
  );
}
