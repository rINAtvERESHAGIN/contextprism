import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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

export function ToggleModelUi({
  models,
  selectedModelData,
  onSelect,
}: {
  selectedModelData: ModelUi;
  models: ModelUi[];
  onSelect: (
    id: string,
    callback: { setModelSelectorOpen: Dispatch<SetStateAction<boolean>> }
  ) => void;
}) {
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

  function handleOnSelect(id: string) {
    return onSelect(id, { setModelSelectorOpen });
  }
  return (
    <ModelSelector open={modelSelectorOpen} onOpenChange={setModelSelectorOpen}>
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
                model={m}
                onSelect={handleOnSelect}
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
  model: ModelUi;
  selectedModel: string;
  onSelect: (id: string) => void;
}

const ModelItem = ({ model, selectedModel, onSelect }: ModelItemProps) => {
  const handleSelect = useCallback(
    () => onSelect(model.id),
    [onSelect, model.id]
  );
  return (
    <ModelSelectorItem key={model.id} onSelect={handleSelect} value={model.id}>
      <ModelSelectorLogo provider={model.chefSlug} />
      <ModelSelectorName>{model.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {model.providers.map(provider => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {selectedModel === model.id ? (
        <CheckIcon className='ml-auto size-4' />
      ) : (
        <div className='ml-auto size-4' />
      )}
    </ModelSelectorItem>
  );
};

ModelItem.displayName = 'ModelItem';
