import axios from 'axios';
import pg from 'pg';

// Configuração do PostgreSQL
const { Pool } = pg;
export const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'appdb',
    password: 'postgres',
    port: 5432
}
const pool = new Pool(poolConfig);

interface Proposta {
  id: string;
  cpf: string;
  data: string;
  login: string;
  nome: string;
  status: string;
  valor: number;
}

async function fetchPropostas(): Promise<Proposta[]> {
  try {
    const response = await axios.get<Proposta[]>('http://localhost:5000/propostas');
    return response.data;
  } catch (err) {
    const error = err as Error;
    if (typeof err === 'object' && err !== null) {
      const axiosError = err as { response?: any, request?: any };
      if (axiosError.response) {
        console.error('Erro na requisição:', axiosError.response.status, error.message);
      } else if (axiosError.request) {
        console.error('Sem resposta do servidor:', error.message);
      } else {
        console.error('Erro ao configurar requisição:', error.message);
      }
    } else {
      console.error('Erro desconhecido:', error.message);
    }
    throw error;
  }
}

async function savePropostas(propostas: Proposta[]): Promise<void> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Cria tabela se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS propostas (
        id VARCHAR(50) PRIMARY KEY,
        cpf VARCHAR(11) NOT NULL,
        data TIMESTAMP NOT NULL,
        login VARCHAR(100) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        valor NUMERIC(10,2) NOT NULL
      )
    `);

    // Insere cada proposta
    for (const proposta of propostas) {
      await client.query(
        'INSERT INTO propostas (id, cpf, data, login, nome, status, valor) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING',
        [proposta.id, proposta.cpf, proposta.data, proposta.login, proposta.nome, proposta.status, proposta.valor]
      );
    }

    await client.query('COMMIT');
    console.log(`${propostas.length} propostas salvas com sucesso!`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao salvar propostas:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    const propostas = await fetchPropostas();
    await savePropostas(propostas);
  } catch (error) {
    console.error('Erro no processo:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

export default main;
