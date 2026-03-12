import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
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
} from '../../ai-elements/model-selector';
import { PromptInputButton } from '../../ai-elements/prompt-input';
import { CheckIcon } from 'lucide-react';

export interface ModelUi {
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
  open: boolean;
  selectedModelData: ModelUi;
  models: ModelUi[];
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSelect: (id: string) => void;
}) {
  return (
    <ModelSelector onOpenChange={onOpenChange} open={open}>
      <ModelSelectorTrigger asChild>
        <PromptInputButton>
          {selectedModelData && selectedModelData?.chefSlug && (
            <ModelSelectorLogo provider={selectedModelData.chefSlug} />
          )}
          {selectedModelData && selectedModelData?.name && (
            <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
          )}
        </PromptInputButton>
      </ModelSelectorTrigger>

      <ModelSelectorContent>
        <ModelSelectorInput placeholder='Search models...' />

        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          <ModelSelectorGroup heading={'llama'}>
            {models.map(m => (
              <ModelItem
                key={m.id}
                m={m}
                onSelect={onSelect}
                selectedModel={selectedModelData && selectedModelData.name}
              />
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}

/* -------------------------------------------------------------------------- */
// ---
/* -------------------------------------------------------------------------- */

interface ModelItemProps {
  m: ModelUi;
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
