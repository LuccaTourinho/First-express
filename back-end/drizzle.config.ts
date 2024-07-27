import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Caminho para o seu arquivo de schema
  out: './drizzle', // Pasta de saída para os artefatos gerados
  dialect: 'postgresql', // Definindo o dialeto do banco de dados como PostgreSQL
  dbCredentials: {
    host: 'localhost', // Host do banco de dados
    user: 'postgres', // Nome de usuário do banco de dados
    password: 'password', // Senha do banco de dados
    database: 'ToDo', // Nome do banco de dados
    port: 5432, // Porta do banco de dados
  },
});
