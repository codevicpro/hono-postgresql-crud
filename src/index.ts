import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import userRoutes from './routes/userRoutes.js';

const app = new Hono();
app.route('/users', userRoutes);

serve(
    {
        fetch: app.fetch,
        port: Number(process.env.PORT) || 3000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
