import { UIMessage, UIDataTypes, UITools } from 'ai';
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@contextprism/ai-components';
import { MessageSquare } from 'lucide-react';
import { MessageFabric } from '../entities/Messages/MessageFabric';
/* -------------------------------------------------------------------------- */
// ---Root
/* -------------------------------------------------------------------------- */
export function ChatUi({ messages }: { messages: UIMessage[] }) {
  console.log('ChatUi:messages', messages);
  return <ConversationBody messages={messages} />;
}

/* -------------------------------------------------------------------------- */
// ---Conversation
/* -------------------------------------------------------------------------- */
export function ConversationBody({ messages }: { messages: UIMessage[] }) {
  console.log('messages', messages);
  return (
    <div className='max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]'>
      <div className='flex flex-col h-full'>
        <Conversation>
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className='size-12' />}
                title='Start a conversation'
                description='Type a message below to begin chatting'
              />
            ) : (
              messages.map(m => <MessageFabric key={m.id} message={m} />)
            )}
          </ConversationContent>
          <ConversationDownload messages={messages} />
          <ConversationScrollButton />
        </Conversation>
      </div>
    </div>
  );
}
