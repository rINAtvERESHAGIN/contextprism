export function ToolGetWeatherInformationPart({ part }: { part: any }) {
  const callId = part.toolCallId;

  switch (part.state) {
    case 'input-streaming':
      return <pre key={callId}>{JSON.stringify(part, null, 2)}</pre>;
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
          Error getting weather for {part.input.city}: {part.errorText}
        </div>
      );
    default:
      return null;
  }
}
