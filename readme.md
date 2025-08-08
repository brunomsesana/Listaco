# 📋 Listaço — Aplicação de Listas com Login

Este é um projeto Node.js com Express que permite usuários se registrarem, fazerem login e manterem suas próprias listas salvas em um banco de dados PostgreSQL.

Criei esse projeto em 2022, como parte do meu aprendizado em back-end com express.js e frontend com handlebars.

---

## ⚙️ Requisitos

Antes de começar, você precisa ter o seguinte instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- Git (opcional, mas recomendado)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/brunosesana/listaco.git
cd listaco
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL com as seguintes tabelas:

```sql
CREATE TABLE login (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE listaco (
    id SERIAL PRIMARY KEY,
    list INTEGER,
    text TEXT,
    owner INTEGER REFERENCES login(id),
    inne TEXT
);
```

> 💡 Dica: Você pode usar o [pgAdmin](https://www.pgadmin.org/) ou qualquer ferramenta que preferir para isso.

### 4. Crie um arquivo `.env` na raiz do projeto

Preencha com suas variáveis de ambiente:

```env
SESSION_SECRET=sua_senha_supersecreta
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

---

## 📁 Estrutura do Projeto

```
.
├── db.js               # Conexão com PostgreSQL
├── routes/
│   └── pages.js        # Rotas da aplicação
├── views/
│   ├── index.hbs       # Página principal (logado)
│   ├── login.hbs       # Página de login
│   └── register.hbs    # Página de registro
├── public/             # Arquivos estáticos (CSS, JS, imagens)
├── .env                # Variáveis de ambiente
├── app.js              # Ponto de entrada da aplicação
└── package.json
```

---

## 🛠️ Scripts disponíveis

```bash
npm start
```

> Inicia o servidor local em [http://localhost:3000](http://localhost:3000)

---

## 🔐 Funcionalidades

- Registro de usuário com criptografia de senha (bcrypt)
- Login com sessão (express-session)
- Renderização de páginas com Handlebars (`.hbs`)
- Salvamento e recuperação de listas do usuário logado
- Roteamento modular com Express Router

---

## ✅ To-do (O que faria diferente hoje em dia? (2025))

- Este projeto usa `body-parser`, que já está incluído no Express moderno como `express.json()` e `express.urlencoded()`. Atualize se quiser simplificar.
- O projeto está usando `bcrypt` de forma síncrona para hashing de senhas — isso é seguro, mas pode ser otimizado com a versão assíncrona em ambientes com muitos usuários.
- Validação de entrada (nome, email, senha)
- Edição de listas via interface
- Frontend mais elaborado
- Suporte a múltiplas listas nomeadas
- Paginação ou visualização de listas antigas

---

## 🧑‍💻 Autor

Feito por [Bruno M. Sesana](https://github.com/brunomsesana)