import { useState, useCallback } from 'react';
import {
  PromptInputMessage,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
  PromptInput,
} from '@contextprism/ai-components';
import { CtxModels } from '../../app/chat.provider';

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

/* -------------------------------------------------------------------------- */
// ---
/* -------------------------------------------------------------------------- */
interface InputPromptComponentProps {
  models: CtxModels | undefined;
  placeSlots: { tools: React.ElementType[] };
}

function approveRenderTools(tools: React.ElementType[] | undefined) {
  return tools && tools.length > 0;
}
function renderTools(tools: React.ElementType[]) {
  return tools.map((Component, index) => <Component key={index} />);
}
export const InputPrompt = ({
  models,
  placeSlots: { tools },
}: InputPromptComponentProps) => {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

  const handleSubmit = useCallback((message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus('submitted');

    // eslint-disable-next-line no-console
    console.log('Submitting message:', message);

    setTimeout(() => {
      setStatus('streaming');
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus('ready');
    }, STREAMING_TIMEOUT);
  }, []);

  return (
    <div>
      <PromptInputProvider>
        <PromptInput globalDrop multiple onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>

          <PromptInputFooter>
            <PromptInputTools>
              {/* INPROGRESS */}
              {/* <AttachmentsMenu /> */}
              {/* <Tools.Search /> */}
              {approveRenderTools(tools) && renderTools(tools)}
            </PromptInputTools>

            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  );
};
