# Implementação do Teste Técnico - Integração API, Banco e RPA

## 📝 Sobre a Minha Solução

Implementei uma solução completa em TypeScript que:

1. Consome a API de propostas em `http://localhost:5000/propostas`
2. Armazena os dados em um banco de dados JSON (usando um arquivo `db.json`)
3. Automatiza o preenchimento dos dados no frontend usando RPA com Puppeteer

## 🛠️ Tecnologias Utilizadas

- TypeScript
- Node.js
- Express (para mock da API)
- Puppeteer (para automação/RPA)
- Docker (para containerização)

## 🔧 Como Executar o Projeto

### Pré-requisitos
- Node.js v16+
- Docker instalado
- NPM ou Yarn

### Passo a Passo

1. Clone o repositório e acesse a pasta:
```bash
git clone https://github.com/KenidyCorrea/lev-teste.git
cd lev-teste
```

2. Instale as dependências (usei --legacy-peer-deps para resolver conflitos):
```bash
npm install --legacy-peer-deps
```

3. Inicie os containers (API mock e frontend):
```bash
docker-compose up
```

4. Execute o script de automação completo:
```bash
npm run automation
```

5. (Opcional) Para acessar o frontend manualmente:
```bash
npm start
```

## 📌 Detalhes da Implementação

- **API**: Criei um mock simples com Express que retorna dados de propostas
- **Banco de Dados**: Optei por um arquivo JSON simples para armazenamento
- **RPA**: Implementei usando Puppeteer para preencher automaticamente o formulário no frontend

## ⏱️ Tempo de Execução
O processo completo (API + DB + RPA) leva aproximadamente 2 minutos para ser concluído.

## 📂 Estrutura de Arquivos
- `/scripts/automation.ts` - Script principal de automação
- `/src/db/db.json` - Banco de dados JSON
- `docker-compose.yml` - Configuração dos containers
