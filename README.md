<h1 align="center">
  <br>
  🚀 SquadGo
  <br>
</h1>

<h4 align="center">
  Plataforma completa de gerenciamento de equipes, projetos e alocação de recursos
</h4>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" />
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-como-rodar">Como rodar</a> •
  <a href="#-autor">Autor</a>
</p>

---

## 📖 Sobre o projeto

O **SquadGo** é uma aplicação full stack criada para **gerenciar equipes, projetos e alocação de colaboradores**. A plataforma permite que gerentes tenham uma visão completa sobre:

- **Quem** está trabalhando **em qual projeto**
- **Quanto tempo** cada colaborador está dedicando por projeto
- **Alocação de recursos** entre clientes e demandas internas
- **Escalas de trabalho** semanais e mensais
- **Skills, feedbacks e 1:1s** dos colaboradores

O objetivo é substituir planilhas e processos manuais por uma ferramenta centralizada, visual e intuitiva — dando aos gestores o controle total sobre a capacidade do time e a distribuição de esforço.

---

## ✨ Funcionalidades

### 👥 Gestão de Pessoas
- Cadastro completo de colaboradores (dados, skills, status, férias)
- Perfil individual com histórico de projetos, feedbacks e avaliações
- Organograma dinâmico baseado em líderes e times
- Sistema de **Hard Skills** e **Soft Skills** com avaliação por nível

### 📁 Gestão de Projetos
- Criação e edição de projetos vinculados a clientes
- Alocação de colaboradores com **controle de horas por projeto**
- Histórico completo de mudanças (auditoria)
- Filtros por tipo, cliente, status e responsáveis
- Controle de status: em andamento, concluído, pausado, etc.

### 🏢 Gestão de Clientes
- Cadastro de clientes com imagem e POC (ponto de contato)
- Listagem de projetos ativos por cliente
- Histórico de relacionamento

### 📅 Escalas de Trabalho
- Criação de escalas semanais e mensais
- Alocação de colaboradores por sala e dia da semana
- Envio de escala por e-mail
- Controle de férias e disponibilidade

### 📊 Dashboard e Visão Geral
- Gráficos comparativos de horas por projeto e por colaborador
- Distribuição de projetos por tipo
- Visão planejada de liberação de recursos
- Indicadores de capacidade do time

### 🔐 Autenticação e Permissões
- Autenticação via **JWT**
- Sistema de **roles e permissões granulares**
- Recuperação de senha por e-mail
- Controle de acesso por módulo e ação

### 🔔 Extras
- Notificações em tempo real (WebSocket)
- Sistema de feedbacks contínuos
- Registro de **1:1s** (reuniões individuais)
- Notas de versão / changelog interno

---

## 🛠 Tecnologias

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Chakra%20UI-319795?logo=chakraui&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?logo=recharts&logoColor=white" />
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-FE0902?logo=typeorm&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/BullMQ-FF6B6B?logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white" />
</p>

### Infra e Ferramentas
<p>
  <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white" />
</p>

---

## 📂 Estrutura do projeto

```
squadgo/
├── tc-squadgo-api/          # Backend (Node.js + Express + TypeORM)
│   ├── src/
│   │   ├── modules/         # Módulos de domínio (Accounts, Projects, etc.)
│   │   ├── config/          # Configurações (auth, cache, mail...)
│   │   └── shared/          # Providers, middlewares, infra
│   ├── tests/               # Testes automatizados
│   └── package.json
│
├── tc-squadgo-frontend/     # Frontend (React + Vite + Chakra UI)
│   ├── src/
│   │   ├── pages/           # Páginas (Dashboard, Projects, Resources...)
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── context/         # Context API
│   │   ├── services/        # Integração com API
│   │   └── styles/          # Tema e estilos globais
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Como rodar

### Pré-requisitos
- **Node.js** 18+
- **Yarn** ou **npm**
- **PostgreSQL** rodando localmente
- **Redis** (opcional, para cache e filas)

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/squadgo.git
cd squadgo
```

### 2. Rodar o Backend

```bash
cd tc-squadgo-api
yarn install
```

Crie um arquivo `.env` na raiz da API com as variáveis necessárias (veja `.env.example` como referência):

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/squadgo
JWT_SECRET=sua_chave_secreta
REDIS_URL=redis://localhost:6379
```

Rode as migrations:

```bash
yarn typeorm migration:run
```

Inicie o servidor:

```bash
yarn dev
```

A API estará disponível em `http://localhost:3333`.

### 3. Rodar o Frontend

Em outro terminal:

```bash
cd tc-squadgo-frontend
yarn install
```

Crie um `.env`:

```env
VITE_API_URL=http://localhost:3333
```

Inicie o app:

```bash
yarn dev
```

O frontend estará em `http://localhost:5173`.

---

## 🧪 Testes

**Backend:**

```bash
cd tc-squadgo-api
yarn test
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---
 

## 👤 Autor

**Fernando-klee**

<p>
  <a href="https://github.com/fernando-klee">
    <img src="https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/fernando-k-3935b3270/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white" />
  </a>
</p>

---
