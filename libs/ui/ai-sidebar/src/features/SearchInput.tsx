import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { TextFieldProps } from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';

export const SearchInput = ({
  name = 'search',
  textFieldProps,
}: {
  name?: 'search';
  textFieldProps?: TextFieldProps;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value, ...rest } }) => (
        <TextField
          {...rest}
          fullWidth
          variant='outlined'
          size='medium'
          placeholder='Ask anything...'
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.default',
            },
          }}
          {...textFieldProps}
        />
      )}
    />
  );
};
