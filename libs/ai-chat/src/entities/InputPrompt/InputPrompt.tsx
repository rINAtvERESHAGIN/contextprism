import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PromptInputMessage,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
  ModelUi,
  ToggleModel,
  PromptInput,
} from '@contextprism/ai-components';
import { CtxModels } from '../../app/chat.provider';

const model = [
  {
    name: 'lfm2:latest',
    model: 'lfm2:latest',
    modified_at: '2026-03-11T11:45:26.842273729+03:00',
    size: 14415742358,
    digest: 'd6c816d74887ed480a3afd5baa2dd2a5987ef6b359b8661e80e1e9fb3501650c',
    details: {
      parent_model: '',
      format: 'gguf',
      family: 'lfm2moe',
      families: ['lfm2moe'],
      parameter_size: '23.8B',
      quantization_level: 'Q4_K_M',
    },
  },
];

const m = model.map(mo => ({
  chef: 'Ollama',
  chefSlug: mo.details.family,
  id: mo.model,
  name: mo.name,
  providers: mo.details.families,
}));

const models2 = [
  {
    chef: 'OpenAI',
    chefSlug: 'openai',
    id: 'gpt-4o',
    name: 'GPT-4o',
    providers: ['openai', 'azure'],
  },
  {
    chef: 'OpenAI',
    chefSlug: 'openai',
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    providers: ['openai', 'azure'],
  },
  {
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    id: 'claude-opus-4-20250514',
    name: 'Claude 4 Opus',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    id: 'claude-sonnet-4-20250514',
    name: 'Claude 4 Sonnet',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    chef: 'Google',
    chefSlug: 'google',
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    providers: ['google'],
  },
];

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

export const InputPrompt = ({ models }: { models: CtxModels | undefined }) => {
  const [model, setModel] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!model && models) {
      setModel(models[0].id);
    }
  }, []);

  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');


  const arrModels = useMemo(
    () => (models ? Object.values(models) : []),
    [models]
  );
  const selectedModelData = arrModels.find(m => m);

  const handleModelSelect = useCallback((id: string) => {
    setModel(id);
    setModelSelectorOpen(false);
    // setLastUserLLM: (value: string) => void
  }, []);

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

  useEffect(() => {
    console.log('models:::', models);
  }, [models]);


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
              {models && (
                <ToggleModel
                  models={arrModels}
                  open={modelSelectorOpen}
                  onOpenChange={setModelSelectorOpen}
                  selectedModelData={selectedModelData}
                  onSelect={handleModelSelect}
                />
              )}
            </PromptInputTools>

            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  );
};
