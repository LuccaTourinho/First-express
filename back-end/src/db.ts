import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

// Configuração da conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',     // Nome de usuário do banco de dados
    host: 'localhost',    // Host do banco de dados
    database: 'ToDo',     // Nome do banco de dados
    password: '041199',   // Senha do banco de dados
    port: 5432,           // Porta do banco de dados
  });

  // Adicionando log de erros para o pool de conexões
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

// Criando uma instância do Drizzle ORM com a conexão e o schema
export const db = drizzle(pool, { schema });
