import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
  Message,
  MessageContent,
  MessageResponse,
} from '@contextprism/aiui';
import { UIMessage } from 'ai';
import { MessageSquare } from 'lucide-react';

export function ChatMessagesRoot({
  messages,
  addToolOutput,
}: {
  messages: UIMessage[];
  addToolOutput: (payload: any) => void;
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
              messages.map(message => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text': // we don't use any reasoning or tool calls in this example
                          return (
                            <MessageResponse key={`${message.id}-${i}`}>
                              {part.text}
                            </MessageResponse>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationDownload messages={messages} />
          <ConversationScrollButton />
        </Conversation>
      </div>
    </div>
  );
}
