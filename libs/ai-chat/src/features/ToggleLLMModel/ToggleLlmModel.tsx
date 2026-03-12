import { ToggleModel } from '@contextprism/ai-components';
import {
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo
} from 'react';
import { useChatCtx } from '../../app/chat.provider';

export function ToggleLLMModel() {
  const { models, lastUserLLM, setLastUserLLM } = useChatCtx();

  const handleModelSelect = useCallback(
    (
      id: string,
      callback: { setModelSelectorOpen: Dispatch<SetStateAction<boolean>> }
    ) => {
      console.log('model::id::', id);
      if (models) setLastUserLLM(models[id]);
      callback.setModelSelectorOpen(false);
      console.log('models:::::', models);
      // NOTICE: update chat store : current user option model
    },
    [models, setLastUserLLM]
  );

  const arrModels = useMemo(
    () => (models ? Object.values(models) : []),
    [models]
  );

  // return <h1>null12341234</h1>;
  return (
    <ToggleModel
      models={arrModels}
      selectedModelData={lastUserLLM || Object.values(models)[0]}
      onSelect={handleModelSelect}
    />
  );
}
