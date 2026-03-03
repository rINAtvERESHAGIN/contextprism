
export function ToolGetLocationPart({ part }: { part: any }) {
  const callId = part.toolCallId;

  switch (part.state) {
    case 'input-streaming':
      return <div key={callId}>Preparing location request...</div>;
    case 'input-available':
      return <div key={callId}>Getting location...</div>;
    case 'output-available':
      return <div key={callId}>Location: {part.output}</div>;
    case 'output-error':
      return <div key={callId}>Error getting location: {part.errorText}</div>;
    default:
      return null;
  }
}
