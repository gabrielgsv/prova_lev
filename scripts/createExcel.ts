import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import pg from 'pg';
import { poolConfig } from './insertDb';

// Configuração do PostgreSQL
const { Pool } = pg;
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

async function fetchPropostasFromDB(): Promise<Proposta[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM propostas');
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar propostas do banco:', error);
    throw error;
  } finally {
    client.release();
  }
}

function exportToExcel(propostas: Proposta[]): string {
  if (propostas.length === 0) {
    throw new Error('Nenhuma proposta encontrada para exportar');
  }

  const data = propostas.map(p => ({
    Nome: p.nome,
    Login: p.login,
    Status: p.status,
    CPF: p.cpf,
    Data: p.data,
    Valor: p.valor
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Propostas");
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  const filePath = path.join(process.cwd(), 'propostas.xlsx');
  
  fs.writeFileSync(filePath, excelBuffer);
  return filePath;
}

async function main() {
  try {
    console.log('Buscando propostas do banco de dados...');
    const propostas = await fetchPropostasFromDB();
    console.log(`Encontradas ${propostas.length} propostas`);
    
    const filePath = exportToExcel(propostas);
    console.log(`Arquivo gerado com sucesso em: ${filePath}`);
    console.log('Caminho completo:', path.resolve(filePath));
  } catch (error) {
    console.error('Erro ao gerar arquivo Excel:', error);
    process.exit(1);
  }
}

export default main;
