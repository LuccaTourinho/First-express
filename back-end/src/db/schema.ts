import { pgTable, serial, varchar, date, timestamp } from 'drizzle-orm/pg-core';

// Definindo a tabela `task` com os tipos de dados e constraints necessários
export const task = pgTable('task', {
  id: serial('id').primaryKey(), // Coluna de ID auto-incremento e chave primária
  nm_task: varchar('nm_task', { length: 255 }), // Coluna para o nome da tarefa
  dt_task: date('dt_task'), // Coluna para a data da tarefa
  dt_created: timestamp('dt_created').defaultNow(), // Coluna para a data de criação com valor padrão como o timestamp atual
  dt_updated: timestamp('dt_updated').defaultNow(), // Coluna para a data de atualização com valor padrão como o timestamp atual
});