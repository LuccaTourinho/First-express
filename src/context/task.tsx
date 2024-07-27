import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '../interface';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../lib/db'; 

interface TaskContextFormat {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (newTask: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>) => Promise<void>;
    editTask: (id: number, updatedTask: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>) => Promise<void>;
    removeTask: (id: number) => Promise<void>;
    getTaskById: (id: number) => Promise<Task>;
}

const TaskContext = createContext<TaskContextFormat | undefined>(undefined);

export const TaskProvider: React.FunctionComponent<{children: ReactNode}> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Função para buscar todas as tarefas
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Aqui você pode exibir um alerta ou mensagem de erro para o usuário, se desejar
        }
    };

    // Função para adicionar uma nova tarefa
    const addTask = async (newTask: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>) => {
        try {
            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
        } catch (error) {
            console.error('Error adding task:', error);
            // Aqui você pode exibir um alerta ou mensagem de erro para o usuário, se desejar
        }
    };

    // Função para atualizar uma tarefa existente
    const editTask = async (id: number, updatedTask: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>) => {
        try {
            const taskToUpdate = await updateTask(id, updatedTask);
            setTasks(tasks.map(task => task.id === id ? taskToUpdate : task));
        } catch (error) {
            console.error('Error updating task:', error);
            // Aqui você pode exibir um alerta ou mensagem de erro para o usuário, se desejar
        }
    };

    // Função para remover uma tarefa
    const removeTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); 
        } catch (error) {
            console.error('Error deleting task:', error);
            // Aqui você pode exibir um alerta ou mensagem de erro para o usuário, se desejar
        }
    };

    // Função para obter uma tarefa específica pelo ID
    const getTaskById = async (id: number): Promise<Task> => {
        try {
            return await getTaskById(id);
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            // Aqui você pode exibir um alerta ou mensagem de erro para o usuário, se desejar
            throw error;
        }
    };

    // UseEffect para buscar tarefas quando o provider é montado
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{ tasks, fetchTasks, addTask, editTask, removeTask, getTaskById }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextFormat => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
