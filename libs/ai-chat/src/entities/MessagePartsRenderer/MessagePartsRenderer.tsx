import { TextPart } from '../parts/TextPart';
import { ToolAskForConfirmationPart } from '../parts/ToolAskForConfirmationPart';
import { ToolGetLocationPart } from '../parts/ToolGetLocationPart';
import { ToolGetWeatherInformationPart } from '../parts/ToolGetWeatherInformationPart';

export function MessagePartsRenderer({
  parts,
  addToolOutput,
}: {
  parts: any[];
  addToolOutput: (payload: any) => void;
}) {
  return (
    <>
      {parts.map((part: any, idx: number) => {
        switch (part.type) {
          case 'text':
            return <TextPart key={idx} part={part} />;
          case 'tool-askForConfirmation':
            return (
              <ToolAskForConfirmationPart
                key={part.toolCallId || idx}
                part={part}
                addToolOutput={addToolOutput}
              />
            );
          case 'tool-getLocation':
            return (
              <ToolGetLocationPart key={part.toolCallId || idx} part={part} />
            );
          case 'tool-getWeatherInformation':
            return (
              <ToolGetWeatherInformationPart
                key={part.toolCallId || idx}
                part={part}
              />
            );
          default:
            return <span key={idx}>Unsupported part type: {part.type}</span>;
        }
      })}
    </>
  );
}
