export function ToolAskForConfirmationPart({
  part,
  addToolOutput,
}: {
  part: any;
  addToolOutput: (payload: any) => void;
}) {
  const callId = part.toolCallId;

  switch (part.state) {
    case 'input-streaming':
      return <div key={callId}>Loading confirmation request...</div>;
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
      return <div key={callId}>Location access allowed: {part.output}</div>;
    case 'output-error':
      return <div key={callId}>Error: {part.errorText}</div>;
    default:
      return null;
  }
}
