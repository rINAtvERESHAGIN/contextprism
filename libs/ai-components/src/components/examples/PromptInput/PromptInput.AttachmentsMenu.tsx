import {
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionAddAttachments,
} from '../../ai-elements/prompt-input';

export function AttachmentsMenu() {
  return (
    <PromptInputActionMenu>
      <PromptInputActionMenuTrigger />
      <PromptInputActionMenuContent>
        <PromptInputActionAddAttachments />
      </PromptInputActionMenuContent>
    </PromptInputActionMenu>
  );
}
