import { useCallback } from 'react';
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
import { CtxModels, useChatCtx } from '../../app/chat.provider';

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
  const { lastUserLLM, sendMessage, status } = useChatCtx();

  const handleSubmit = useCallback((message: PromptInputMessage) => {
    console.log('message', message);
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    // setStatus('submitted');

    // eslint-disable-next-line no-console
    console.log('Submitting message:', message);
    sendMessage({ text: message.text }, { body: { model: lastUserLLM?.name } });
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
