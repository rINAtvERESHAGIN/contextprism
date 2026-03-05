import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { MessageItem } from '../MessageItem/MessageItem';
import { UIMessage } from 'ai';

type MessageListProps = {
  messages: UIMessage[];
};

export function MessageList({ messages,addToolOutput }: MessageListProps) {
  return (
    <LayoutGroup>
      <AnimatePresence>
        {/* {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))} */}
        {messages?.map(message => (
          <div key={message.id}>
            <strong>{`${message.role}: `}</strong>
            {message.parts.map(part => {
              switch (part.type) {
                // render text parts as simple text:
                case 'text':
                  return part.text;

                // for tool parts, use the typed tool part names:
                case 'tool-askForConfirmation': {
                  const callId = part.toolCallId;

                  switch (part.state) {
                    case 'input-streaming':
                      return (
                        <div key={callId}>Loading confirmation request...</div>
                      );
                    case 'input-available':
                      return (
                        <div key={callId}>
                          {part.input.message}
                          <div>
                            <button
                              onClick={() =>
                                addToolOutput({
                                  tool: 'askForConfirmation',
                                  toolCallId: callId,
                                  output: 'Yes, confirmed.',
                                })
                              }
                            >
                              Yes
                            </button>
                            <button
                              onClick={() =>
                                addToolOutput({
                                  tool: 'askForConfirmation',
                                  toolCallId: callId,
                                  output: 'No, denied',
                                })
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>
                      );
                    case 'output-available':
                      return (
                        <div key={callId}>
                          Location access allowed: {part.output}
                        </div>
                      );
                    case 'output-error':
                      return <div key={callId}>Error: {part.errorText}</div>;
                  }
                  break;
                }

                case 'tool-getLocation': {
                  const callId = part.toolCallId;

                  switch (part.state) {
                    case 'input-streaming':
                      return (
                        <div key={callId}>Preparing location request...</div>
                      );
                    case 'input-available':
                      return <div key={callId}>Getting location...</div>;
                    case 'output-available':
                      return <div key={callId}>Location: {part.output}</div>;
                    case 'output-error':
                      return (
                        <div key={callId}>
                          Error getting location: {part.errorText}
                        </div>
                      );
                  }
                  break;
                }

                case 'tool-getWeatherInformation': {
                  const callId = part.toolCallId;

                  switch (part.state) {
                    // example of pre-rendering streaming tool inputs:
                    case 'input-streaming':
                      return (
                        <pre key={callId}>{JSON.stringify(part, null, 2)}</pre>
                      );
                    case 'input-available':
                      return (
                        <div key={callId}>
                          Getting weather information for {part.input.city}...
                        </div>
                      );
                    case 'output-available':
                      return (
                        <div key={callId}>
                          Weather in {part.input.city}: {part.output}
                        </div>
                      );
                    case 'output-error':
                      return (
                        <div key={callId}>
                          Error getting weather for {part.input.city}:{' '}
                          {part.errorText}
                        </div>
                      );
                  }
                  break;
                }
              }
            })}
            <br />
          </div>
        ))}
      </AnimatePresence>
    </LayoutGroup>
  );
}
