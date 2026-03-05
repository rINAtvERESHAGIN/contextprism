import { Hono } from 'hono';

const helloWorldRoutes = new Hono();
// /hono/api/hello/
helloWorldRoutes.get('hi', c => {
  return c.text('hello world');
});

export { helloWorldRoutes };
