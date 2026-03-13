import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { helloWorldRoutes } from './routes/api/hello-worlds';
import { llm } from './routes/api/llm';
import { logger } from 'hono/logger';
import { vllm } from './routes/api/vllm';

// ---Init Hono
const app = new Hono();
app.use('*', logger());
// ---Config
app.use(
  '*',
  cors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://0.0.0.0:4200',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  })
);
// ---Routes
app.route('/hono/api/hello', helloWorldRoutes);
app.route('/hono/api/llm', llm);
app.route('/hono/api/vllm', vllm);

// app.use(prettyJSON());

// ---Running server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
