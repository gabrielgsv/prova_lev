# Prova - Integração API, Banco de Dados e RPA

## 📌 Objetivo

O candidato deve desenvolver um script que realize a seguinte sequência de processos:

1. **Requisição**: Consumir uma API para obter os dados.
    ```sh
    curl -X GET http://localhost:5000/propostas
    ```

3. **Banco de Dados**: Inserir os dados obtidos no banco de dados.
4. **RPA (Automatização de Processos Robóticos)**: Criar um processo que busque os dados do banco e os insira no campo especificado na url http://localhost:3000/.

---

## ✅ Requisitos
- Preferencialmente utilizar TypeScript.
- O banco de dados pode ser SQL ou NoSQL.
- O RPA pode ser desenvolvido utilizando bibliotecas e ferramentas adequadas para automação.

---

## 🏆 Critérios de Avaliação

- Estrutura e organização do código.
- Correta implementação dos três processos (*requisição, banco de dados, RPA*).
- Clareza na documentação e instrução para execução do projeto.

---

## 📦 Como Instalar
```sh
git clone https://github.com/KenidyCorrea/lev-teste.git
cd lev-teste
```
2️⃣ Instale as dependências necessárias (se aplicável):
```sh
npm install --legacy-peer-deps
```

## 🎯 Comando para inicialização
```sh
npm start
```
