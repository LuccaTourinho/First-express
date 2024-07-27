import axios from 'axios';
import { Task } from '../interface';

/**
 * Cria uma instância do axios para fazer requisições HTTP
 * Configura o baseURL, o timeout e o cabeçalho
 * Transforma os dados antes de enviar e depois de receber
 * Adiciona outras configurações se você quiser
 */
const api = axios.create({
    baseURL: 'http://localhost:3000',  
    timeout: 5000,                 
    headers: {
        'Content-Type': 'application/json', 
    },
    transformRequest: [function (data) {
        return JSON.stringify(data);
    }],
    transformResponse: [function (data) {
        return JSON.parse(data);
    }],
});

/**
 * Função para criar uma nova tarefa.
 * 
 * @param task {Omit<Task, 'id' | 'dt_created' | 'dt_updated'>} - Dados da tarefa a ser criada, sem os campos 'id', 'dt_created' e 'dt_updated'.
 * @returns {Promise<Task>} - Retorna uma Promise que resolve para a tarefa criada.
 * @throws {Error} - Lança uma exceção se houver um erro durante a requisição.
 */
export const createTask = async (task: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>): Promise<Task> => {
    try {
        const response = await api.post<Task>('/tasks', task);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Verifica se o erro é uma instância de AxiosError
            console.error('Error creating task:', error.response?.data || error.message);
            throw new Error(`Error creating task: ${error.response?.data || error.message}`);
        } else {
            // Se não for um erro do Axios, lança um erro genérico
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error occurred while creating task.');
        }
    }
};

/**
 * Função para obter todas as tarefas.
 * 
 * @returns {Promise<Task[]>} - Retorna uma Promise que resolve para um array de tarefas.
 * @throws {Error} - Lança uma exceção se houver um erro durante a requisição.
 */
export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    } catch (error) {
        // Verifica se o erro é um erro de Axios
        if (axios.isAxiosError(error)) {
            // Loga o erro detalhado no console para diagnóstico
            console.error('Error fetching tasks:', error.response?.data || error.message);

            // Lança uma nova exceção com uma mensagem detalhada
            throw new Error(`Error fetching tasks: ${error.response?.data || error.message}`);
        } else {
            // Loga erros inesperados que não são do Axios
            console.error('Unexpected error:', error);

            // Lança uma nova exceção com uma mensagem genérica para erros inesperados
            throw new Error('Unexpected error occurred while fetching tasks.');
        }
    }
};

/**
 * Função para obter uma tarefa específica pelo ID.
 * 
 * @param id {number} - ID da tarefa a ser obtida.
 * @returns {Promise<Task>} - Retorna uma Promise que resolve para a tarefa específica.
 * @throws {Error} - Lança uma exceção se houver um erro durante a requisição.
 */
export const getTaskById = async (id: number): Promise<Task> => {
    try {
        const response = await api.get<Task>(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        // Verifica se o erro é um erro de Axios
        if (axios.isAxiosError(error)) {
            // Loga o erro detalhado no console para diagnóstico
            console.error('Error fetching task:', error.response?.data || error.message);

            // Lança uma nova exceção com uma mensagem detalhada
            throw new Error(`Error fetching task with ID ${id}: ${error.response?.data || error.message}`);
        } else {
            // Loga erros inesperados que não são do Axios
            console.error('Unexpected error:', error);

            // Lança uma nova exceção com uma mensagem genérica para erros inesperados
            throw new Error('Unexpected error occurred while fetching task.');
        }
    }
};

/**
 * Função para atualizar uma tarefa.
 * 
 * @param id {number} - ID da tarefa a ser atualizada.
 * @param task {Omit<Task, 'id' | 'dt_created' | 'dt_updated'>} - Dados da tarefa a ser atualizada, sem os campos 'id', 'dt_created' e 'dt_updated'.
 * @returns {Promise<Task>} - Retorna uma Promise que resolve para a tarefa atualizada.
 * @throws {Error} - Lança uma exceção se houver um erro durante a requisição.
 */
export const updateTask = async (id: number, task: Omit<Task, 'id' | 'dt_created' | 'dt_updated'>): Promise<Task> => {
    try {
        const response = await api.put<Task>(`/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        // Verifica se o erro é um erro de Axios
        if (axios.isAxiosError(error)) {
            // Loga o erro detalhado no console para diagnóstico
            console.error('Error updating task:', error.response?.data || error.message);

            // Lança uma nova exceção com uma mensagem detalhada
            throw new Error(`Error updating task with ID ${id}: ${error.response?.data || error.message}`);
        } else {
            // Loga erros inesperados que não são do Axios
            console.error('Unexpected error:', error);

            // Lança uma nova exceção com uma mensagem genérica para erros inesperados
            throw new Error('Unexpected error occurred while updating task.');
        }
    }
};

/**
 * Função para deletar uma tarefa.
 * 
 * @param id {number} - ID da tarefa a ser deletada.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando a tarefa for deletada.
 * @throws {Error} - Lança uma exceção se houver um erro durante a requisição.
 */
export const deleteTask = async (id: number): Promise<void> => {
    try {
        await api.delete(`/tasks/${id}`);
    } catch (error) {
        // Verifica se o erro é um erro de Axios
        if (axios.isAxiosError(error)) {
            // Loga o erro detalhado no console para diagnóstico
            console.error('Error deleting task:', error.response?.data || error.message);

            // Lança uma nova exceção com uma mensagem detalhada
            throw new Error(`Error deleting task with ID ${id}: ${error.response?.data || error.message}`);
        } else {
            // Loga erros inesperados que não são do Axios
            console.error('Unexpected error:', error);

            // Lança uma nova exceção com uma mensagem genérica para erros inesperados
            throw new Error('Unexpected error occurred while deleting task.');
        }
    }
};