import {
  Conversation as DonorConversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationDownload,
  ConversationScrollButton,
} from '@contextprism/ai-components';
import { UIMessage } from 'ai';
import { MessageSquare } from 'lucide-react';
import { MessageFabric } from '../Messages/MessageFabric';

export function Conversation({ messages }: { messages: UIMessage[] }) {
  return (
    <div className='max-w-4xl mx-auto p-6 relative size-full rounded-lg border w-full h-full'>
      <div className='flex flex-col h-full'>
        <DonorConversation>
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
        </DonorConversation>
      </div>
    </div>
  );
}
