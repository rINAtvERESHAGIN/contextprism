import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type {
  FormControlProps,
  InputLabelProps,
  SelectProps,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

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

export const ToggleLlmModel = ({
  models,
  name,
  formControlProps,
  inputLabelProps,
  selectProps,
}: {
  models: Model[];
  name: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  selectProps?: SelectProps;
}) => {
  const { control } = useFormContext();
  if (!models) return;
  return (
    <FormControl fullWidth {...formControlProps}>
      <InputLabel id='llm-model-select-label' {...inputLabelProps}>
        Select LLM Model
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={models[0]?.name || ''}
        render={({ field: { onChange, value } }) => (
          <Select
            labelId='llm-model-select-label'
            id='llm-model-select'
            value={value}
            label='Select LLM Model'
            onChange={onChange}
            {...selectProps}
          >
            {models.map(model => (
              <MenuItem key={model.name} value={model.name}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
