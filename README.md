# Implementação do Teste Técnico - Integração API, Banco de Dados e RPA

## 📝 Sobre a solução

Implementei uma solução completa em TypeScript que:

1. Consome a API de propostas em `http://localhost:5000/propostas`
2. Armazena os dados em um banco de dados PostgreSQL
3. Automatiza o preenchimento dos dados no frontend usando RPA com Playwright

## 🔧 Como executar o projeto

### Pré-requisitos
- Node.js v16+
- Docker instalado
- NPM ou Bun

### Passo a passo

1. Clone o repositório e acesse a pasta:
```bash
git clone https://github.com/gabrielgsv/prova_lev
cd prova_lev
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Inicie os containers (API mock e frontend):
```bash
docker-compose up
```

4. Execute o script de configuração do Playwright:
```bash
npx playwright install
```

5. Execute o script de automação completo:
```bash
npm run automation
```

Obs.: 
- Se preferir, você pode excluir os arquivos 'propostas.xlsx' e 'upload_screenshot.png' antes de executar o script de automação.
- Acesse o banco de dados através do dbgate: http://localhost:4050/

## 📂 Estrutura de arquivos
- `/scripts/index.ts` - Script principal de banco de dados e automação
- `/src/App.tsx` - Página inicial do frontend em React
- `docker-compose.yml` - Configuração dos containers

## 🐋 Estrutura de containers
- `prova_lev-frontend` - http://localhost:3000/
- `prova_lev-json-server` - http://localhost:5000/
- `dbgate/dbgate` - http://localhost:4050/
- `postgres:15` - http://localhost:5432/

## 🛠️ Tecnologias utilizadas

- TypeScript
- Node.js
- Playwright (para automação/RPA)
- Docker (para containerização)

## ⏱️ Tempo de Execução
O processo completo (API + DB + RPA) leva aproximadamente 2 minutos para ser concluído.