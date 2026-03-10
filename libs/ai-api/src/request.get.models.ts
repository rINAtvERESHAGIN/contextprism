export async function getModelsList() {
  return fetch('/hono/api/llm/models').then(r => r.json());
}
