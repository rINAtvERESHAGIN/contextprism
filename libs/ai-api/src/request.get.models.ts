export async function GetModelsList() {
  return fetch('/hono/api/llm/models').then(r => r.json());
}
