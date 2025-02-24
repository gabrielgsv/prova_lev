const fs = require('fs');
const path = require('path');

interface Proposta {
  id: number;
  nome: string;
  login: string;
  status: "Criado" | "Andamento" | "Finalizada";
  cpf: string;
  data: string;
  valor: number;
}

interface Database {
  propostas: Proposta[];
}

const dbFilePath = path.join(__dirname, 'db', 'db.json');

function loadDb(): Database {
  try {
    if (!fs.existsSync(dbFilePath)) {
      return { propostas: [] };
    }
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data) as Database;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return { propostas: [] };
  }
}

function saveDb(data: Database): void {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    console.log('✅ Banco de dados atualizado!');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
}

function generateCPF(): string {
  const randomNumbers = () => Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const mod = (base: number[], div: number) =>
    (base.reduce((sum, num, index) => sum + num * (div - index), 0) * 10) % 11 % 10;

  const base = randomNumbers();
  const d1 = mod(base, 10);
  const d2 = mod([...base, d1], 11);

  return [...base, d1, d2].join("");
}

function generateName(): string {
  const nomes = ["João", "Maria", "Carlos", "Ana", "Lucas", "Fernanda", "Gustavo", "Juliana"];
  const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Martins", "Rocha"];
  return `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
}

function generateRandomValue(): number {
  return parseFloat((Math.random() * (10000 - 100) + 100).toFixed(2));
}

function updatePropostas(currentPropostas: Proposta[] = []): Proposta[] {
  let db = loadDb();

  if (currentPropostas.length > 0 && db.propostas.length === 0) {
    db.propostas = [...currentPropostas];
  }

  const newId = db.propostas.length ? db.propostas[db.propostas.length - 1].id + 1 : 1;
  db.propostas.push({
    id: newId,
    nome: generateName(),
    login: `digitador${newId}@example.com`,
    status: "Criado",
    cpf: generateCPF(),
    data: new Date().toISOString(),
    valor: generateRandomValue(),
  });

  const propostaCriada = db.propostas.find(p => p.status === "Criado" && p.id !== newId);
  if (propostaCriada) {
    propostaCriada.status = "Andamento";
  }

  const propostaAndamento = db.propostas.find(p => p.status === "Andamento");
  if (propostaAndamento) {
    propostaAndamento.status = "Finalizada";
  }
  console.log(propostaAndamento, propostaCriada);
  
  saveDb(db);

  return db.propostas;
}

setInterval(updatePropostas, 60000);
console.log("⏳ Atualizador rodando a cada 60 segundos...");