import { memo, useCallback, useState } from 'react';
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogoGroup,
} from '../ai-elements/model-selector';
import { PromptInputButton } from '../ai-elements/prompt-input';
import { CheckIcon } from 'lucide-react';

export interface Model {
  chef: string;
  chefSlug: string;
  id: string;
  name: string;
  providers: string[];
}

export function ToggleModel({
  open,
  selectedModelData,
  models,
  onOpenChange,
  onSelect,
}: {
  open: true;
  selectedModelData: Model;
  models: Model[];
  onOpenChange: () => void;
  onSelect: () => void;
}) {
  return (
    // <ModelSelector onOpenChange={setModelSelectorOpen} open={modelSelectorOpen}>
    <ModelSelector onOpenChange={onOpenChange} open={open}>
      <ModelSelectorTrigger asChild>
        <PromptInputButton>
          {selectedModelData?.chefSlug && (
            <ModelSelectorLogo provider={selectedModelData.chefSlug} />
          )}
          {selectedModelData?.name && (
            <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
          )}
        </PromptInputButton>
      </ModelSelectorTrigger>

      <ModelSelectorContent>
        <ModelSelectorInput placeholder='Search models...' />

        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          {['OpenAI', 'Anthropic', 'Google'].map(chef => (
            <ModelSelectorGroup heading={chef} key={chef}>
              {models
                .filter(m => m.chef === chef)
                .map(m => (
                  <ModelItem
                    key={m.id}
                    m={m}
                    // onSelect={handleModelSelect}
                    onSelect={onSelect}
                    selectedModel={selectedModelData.name}
                  />
                ))}
            </ModelSelectorGroup>
          ))}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}

/* -------------------------------------------------------------------------- */
// ---
/* -------------------------------------------------------------------------- */

interface ModelItemProps {
  m: Model;
  selectedModel: string;
  onSelect: (id: string) => void;
}

const ModelItem = memo(({ m, selectedModel, onSelect }: ModelItemProps) => {
  const handleSelect = useCallback(() => onSelect(m.id), [onSelect, m.id]);
  return (
    <ModelSelectorItem key={m.id} onSelect={handleSelect} value={m.id}>
      <ModelSelectorLogo provider={m.chefSlug} />
      <ModelSelectorName>{m.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {m.providers.map(provider => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {selectedModel === m.id ? (
        <CheckIcon className='ml-auto size-4' />
      ) : (
        <div className='ml-auto size-4' />
      )}
    </ModelSelectorItem>
  );
});

ModelItem.displayName = 'ModelItem';
