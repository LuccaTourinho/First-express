import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';	

// Criação da instância do Express
const app = express();
const port = 3000;

// Configuração do Pool de Conexão com o Banco de Dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ToDo',
    password: '041199',
    port: 5432,
});

// Middleware cors para permitir requisições de diferentes origens
app.use(cors()); // Isso permite todas as origens
// app.use(cors({ origin: 'http://localhost:5173' })); // Para permitir apenas de uma origem específica

// Middleware para parsear JSON
app.use(express.json());


// Criar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { nm_task, dt_task } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO task (nm_task, dt_task) VALUES ($1, $2) RETURNING *',
            [nm_task, dt_task]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error on task creation: ', error);
        res.status(500).send('Error on task creation');
    }
});

// Ler todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        res.json(result.rows);
    } catch (error) {
        console.error('Error on reading tasks:', error);
        res.status(500).send('Error on reading tasks');
    }
});

// Ler uma tarefa específica pelo ID
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, nm_task, dt_task FROM task WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error on reading task:', error);
        res.status(500).send('Error on reading task');
    }
});

// Atualizar uma tarefa pelo ID
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { nm_task, dt_task } = req.body;
    try {
        const result = await pool.query(
            'UPDATE task SET nm_task = $1, dt_task = $2, dt_updated = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [nm_task, dt_task, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error on updating task:', error);
        res.status(500).send('Error on updating task');
    }
});

// Deletar uma tarefa pelo ID
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error on deleting task:', error);
        res.status(500).send('Error on deleting task');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
