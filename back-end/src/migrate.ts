import 'dotenv/config'; // Para carregar as variáveis de ambiente do arquivo .env
import { migrate } from 'drizzle-orm/node-postgres/migrator'; // Importa o módulo de migração para PostgreSQL
import { db } from './db'; // Importa a instância do db configurada em db.ts

async function runMigrations() {
    try {
      // Executa as migrações no banco de dados, pulando as que já foram aplicadas
      await migrate(db, { migrationsFolder: './drizzle' });
      console.log("Migrations completed successfully.");
    } catch (error) {
      console.error("Error running migrations:", error);
    } finally {
      // Opcional: se você estiver usando uma conexão que precise ser fechada
      // await db.$pool.end();
    }
  }
  
  // Chama a função de migrações
  runMigrations();
