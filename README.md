# Financy

Projeto desenvolvido durante a Pós Tech Developer 360 (Fullstack com IA) da Rocketseat (FTR).

## Sobre

O Financy e uma aplicação fullstack para controle financeiro pessoal, com:

- Backend em Node.js + TypeScript + GraphQL + Prisma
- Frontend em React + TypeScript + Vite

## Como rodar localmente

### 1. Clone o repositorio e entre na pasta

```bash
git clone <https://github.com/eullerbraz/financy>
cd financy
```

### 2. Configure os arquivos .env

Crie os arquivos abaixo:

- `backend/.env`
- `frontend/.env`

#### Exemplo de `backend/.env`

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-aqui"
```

#### Exemplo de `frontend/.env`

```env
VITE_API_URL="http://localhost:4000/graphql"
```

### 3. Instale as dependencias

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Rode as migrations do backend

No diretorio `backend`:

```bash
npm run migrate:deploy
```

### 5. Inicie o backend

No diretorio `backend`:

```bash
npm run dev
```

Backend disponivel em: `http://localhost:4000/graphql`

### 6. Inicie o frontend

No diretorio `frontend`:

```bash
npm run dev
```

Frontend disponivel em: `http://localhost:5173`

## Scripts

### Backend (`backend/package.json`)

- `npm run dev`: inicia o servidor em modo desenvolvimento com watch
- `npm run migrate -- <nome-da-migration>`: cria/aplica migration no banco local
- `npm run migrate:deploy`: aplica migrations pendentes

### Frontend (`frontend/package.json`)

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera build de producao
- `npm run lint`: roda lint
- `npm run preview`: sobe preview da build

## Proximos passos

- Paginação de transações
- Implementacao dos filtros de transações
- Correcao da input de valor de transação para algo mais intuitivo (currency input)
- Correção da input de data para um datepicker que funcione melhor com o design do projeto
