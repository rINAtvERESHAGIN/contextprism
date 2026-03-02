import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { chatApp } from './routes/api/chat';
import { helloWorldRoutes } from './routes/api/hello-worlds';
import { prettyJSON } from 'hono/pretty-json';
import { llm } from './routes/api/llm';

// ---Init Hono
const app = new Hono();
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
app.route('/hono/api/chat', chatApp);
app.route('/hono/api/hello', helloWorldRoutes);
app.route('hono/api/llm/', llm);

app.use(prettyJSON());
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
