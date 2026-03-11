import { UIMessagePart, UIDataTypes, UITools } from 'ai';
import { ComponentProps } from 'react';

type StatusProps = ComponentProps<typeof ToolAskForConfirmation>;

function StatusInputStreaming({ part }: StatusProps) {
  return <div key={part.toolCallId}>Loading confirmation request...</div>;
}
function StatusInputAvailable({ part }: StatusProps) {
  return (
    <div key={part.toolCallId}>
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
}

export function ToolAskForConfirmation({
  part,
}: {
  part: UIMessagePart<UIDataTypes, UITools>;
}) {


  if (part.state === 'input-streaming')
    return <StatusInputStreaming part={part} />;
  if (part.state === 'input-available')
    return <StatusInputAvailable part={part} />;
  return <></>;
  /* case 'tool-askForConfirmation': {
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
              } */
}
