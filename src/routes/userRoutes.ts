import { Hono } from 'hono';
import { pool } from '../db/database.js';

const userRoutes = new Hono();

// getAll
userRoutes.get('/', async (c) => {
    const { rows } = await pool.query('SELECT * FROM users');
    return c.json(rows);
});

// getById
userRoutes.get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);

        if (rows.length === 0) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json(rows[0]);
    } catch (error) {
        return c.json({ error: 'Database error' }, 500);
    }
});

// Create
userRoutes.post('/', async (c) => {
    const { name, email } = await c.req.json();

    try {
        // INSERT con RETURNING para obtener el id recién creado
        const { rows } = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
            [name, email]
        );

        return c.json({ id: rows[0].id, name, email }, 201);
    } catch (error: any) {
        // Handle UNIQUE constraint violation
        if (error.code === '23505') {
            return c.json({ error: 'Email already exists' }, 400);
        }
        return c.json({ error: 'Database error' }, 500);
    }
});

// Update
userRoutes.put('/:id', async (c) => {
    const { id } = c.req.param();
    const { name, email } = await c.req.json();

    try {
        const { rowCount } = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id]
        );

        if (rowCount === 0) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json({ message: 'User updated' });
    } catch (error: any) {
        if (error.code === '23505') {
            return c.json({ error: 'Email already exists' }, 400);
        }
        return c.json({ error: 'Database error' }, 500);
    }
});

// Delete
userRoutes.delete('/:id', async (c) => {
    const { id } = c.req.param();

    try {
        const { rowCount } = await pool.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );

        if (rowCount === 0) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json({ message: 'User deleted' });
    } catch (error) {
        return c.json({ error: 'Database error' }, 500);
    }
});

export default userRoutes;
