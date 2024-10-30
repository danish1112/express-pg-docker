import express from 'express';
import 'dotenv/config';

import pkg from 'pg';
const { Pool } = pkg;

const app = express();

const port = 8082;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)');
    res.send("success");
});

app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    const response = await pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age]);
    res.json("success");
});

app.get('/users', async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.send(response.rows)
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
