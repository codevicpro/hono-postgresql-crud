import pkg from 'pg';
const { Pool } = pkg;

// 🔹 Connection data
const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'your_password',
    port: 5432,
};

const dbName = 'honodb';

// ✅ 1. Check and create the database if it does not exist
const poolInit = new Pool({ ...config, database: 'postgres' });

async function initDatabase() {
    const res = await poolInit.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [dbName]
    );

    if (res.rowCount === 0) {
        console.log(`✅ Creando base de datos: ${dbName}`);
        await poolInit.query(`CREATE DATABASE ${dbName}`);
    }

    await poolInit.end();
}

// ✅ 2. Connect to the final database and create tables if they do not exist
export const pool = new Pool({ ...config, database: dbName });

async function initTables() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );
  `);

    console.log('✅ Tabla users verificada/creada');
}

// ✅ 3. Initialize everything on import
await initDatabase();
await initTables();
