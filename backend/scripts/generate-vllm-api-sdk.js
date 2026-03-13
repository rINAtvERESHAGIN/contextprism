import { createClient } from '@hey-api/openapi-ts';

createClient({
  input: {
    path: 'http://10.12.1.73:8100/openapi.json',
  },
  output: './src/sdk/vllm-api/',
  plugins: ['@hey-api/client-fetch'],
  format: 'prettier',
  clean: true,
  types: { name: 'CameCase' },
});
