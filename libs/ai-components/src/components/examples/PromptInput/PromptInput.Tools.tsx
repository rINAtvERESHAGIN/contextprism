import { GlobeIcon } from 'lucide-react';
import { PromptInputButton } from '../../ai-elements/prompt-input';

function Tools() {
  return <></>;
}

Tools.Search = () => {
  return (
    <PromptInputButton>
      <GlobeIcon size={16} />
      <span>Search</span>
    </PromptInputButton>
  );
};

export { Tools };
