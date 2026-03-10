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
