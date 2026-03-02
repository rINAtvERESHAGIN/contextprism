export interface ToolResult {
  name: string;
  success: boolean;
  result?: any;
  error?: { code?: string; message: string };
}
