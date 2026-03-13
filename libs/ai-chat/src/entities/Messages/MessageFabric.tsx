import {
  Message,
  MessageContent,
  MessageResponse,
} from '@contextprism/ai-components';
import { UIMessage, UIDataTypes, UITools } from 'ai';

const messageSchema = {
  text: {
    type: 'text',
    ui: () => {},
  },
  'tool-input-available': {},
  'tool-output-available': {},
  'finish-step': {},
  finish: {},
};

export function MessageFabric({
  message,
}: {
  message: UIMessage<unknown, UIDataTypes, UITools>;
}) {
  return (
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

            case 'reasoning':
              return (
                <pre key={i} style={{ backgroundColor: 'red ' }}>
                  {part.text}
                </pre>
              );

            case 'tool-callSayHi':
              return <h1>{part.text}</h1>;
            default:
              return null;
          }
        })}
      </MessageContent>
    </Message>
  );
}
