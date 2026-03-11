import { MessageSquare, MessageSquareIcon } from 'lucide-react';
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
} from '../ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '../ai-elements/message';
import { UIDataTypes, UIMessage, UITools } from 'ai';
import { MessageFabric } from './MessageFabric';
// import '../../index.css'

export function ConversationComponent({
  messages,
}: {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
}) {
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
          {/* <ConversationDownload messages={messages} /> */}
          <ConversationScrollButton />
        </Conversation>
      </div>
    </div>
  );
}
