import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type {
  FormControlProps,
  InputLabelProps,
  SelectProps,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { useSidebarStore } from '../app/store';
import { useGetModelsList } from '@contextprism/ai-fetch';

interface Model {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
}

//  TODO перенести сюда загрузку модели и установка дефолтной
// TODO добавить zustand чтобы сделать persist

export const ToggleLlmModel = ({
  name,
  formControlProps,
  inputLabelProps,
  selectProps,
}: {
  name: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  selectProps?: SelectProps;
}) => {
  const { control } = useFormContext();
  const { setLastUserLLM } = useSidebarStore();
  const { data } = useGetModelsList();
  if (!data) return null;

  if (data && Array.isArray(data) && data.length > 0)
    return (
      <FormControl fullWidth {...formControlProps}>
        <InputLabel id='llm-model-select-label' {...inputLabelProps}>
          Select LLM Model
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={data[0]?.name || ''}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId='llm-model-select-label'
              id='llm-model-select'
              value={value}
              label='Select LLM Model'
              onChange={event => {
                setLastUserLLM(event.target.value);
                onChange(event);
              }}
              {...selectProps}
            >
              {data.map(model => (
                <MenuItem key={model.name} value={model.name}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    );
    
  return null;
};
