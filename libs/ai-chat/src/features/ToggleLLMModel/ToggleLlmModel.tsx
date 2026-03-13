import { ToggleModelUi } from '@contextprism/ai-components';
import { useCallback, Dispatch, SetStateAction, useMemo } from 'react';
import { useChatCtx } from '../../app/chat.provider';

export function ToggleLLMModel() {
  const { models, lastUserLLM, setLastUserLLM } = useChatCtx();
  const handleModelSelect = useCallback(
    (
      id: string,
      callback: { setModelSelectorOpen: Dispatch<SetStateAction<boolean>> }
    ) => {
      // NOTICE: update chat store : current user option model
      if (models) setLastUserLLM(models[id]);
      callback.setModelSelectorOpen(false);
    },
    [models, setLastUserLLM]
  );

  const arrModels = useMemo(
    () => (models ? Object.values(models) : []),
    [models]
  );

  // return <h1>null12341234</h1>;
  return (
    <ToggleModelUi
      models={arrModels}
      selectedModelData={lastUserLLM || Object.values(models)[0]}
      onSelect={handleModelSelect}
    />
  );
}
