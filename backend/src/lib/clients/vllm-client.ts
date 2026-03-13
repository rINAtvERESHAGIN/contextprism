import { client } from '../../sdk/vllm-api/client.gen';
import * as vllmClient from '../../sdk/vllm-api/sdk.gen';

client.setConfig({
  baseUrl: 'http://10.12.1.73:8100/',
});

export { vllmClient };
