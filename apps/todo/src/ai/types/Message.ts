import { Role } from './Role';

export interface Message {
  role: Role;
  name?: string; // для tool messages
  content: string;
  // optional structured fields
  tool_call?: {
    name: string;
    arguments: string; // JSON string
  };
}
