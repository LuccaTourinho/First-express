import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import { db} from './db';
import { task } from './db/schema';
import { eq } from 'drizzle-orm';		

// Criação da instância do Express
const app = express();
const port = 3000;

// Middleware cors para permitir requisições de diferentes origens
app.use(cors()); // Isso permite todas as origens

// Middleware para parsear JSON
app.use(express.json());


// Criar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { nm_task, dt_task } = req.body;
    try {
        const [newTask] = await db.insert(task).values({ nm_task, dt_task }).returning();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error on task creation:', error);
        res.status(500).send('Error on task creation');
    }
});

// Ler todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await db.select().from(task);
        res.json(allTasks);
    } catch (error) {
        console.error('Error on reading tasks:', error);
        res.status(500).send('Error on reading tasks');
    }
});

// Ler uma tarefa específica pelo ID
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [taskDetails] = await db.select().from(task).where(eq(task.id, parseInt(id)));
        if (taskDetails) {
            res.json(taskDetails);
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
        const [updatedTask] = await db.update(task).set({ nm_task, dt_task, dt_updated: new Date() }).where(eq(task.id, parseInt(id))).returning();
        if (updatedTask) {
            res.json(updatedTask);
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
        const [deletedTask] = await db.delete(task).where(eq(task.id, parseInt(id))).returning();
        if (deletedTask) {
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
