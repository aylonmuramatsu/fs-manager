# Projeto Full Stack - FS Manager

### Desenvolvido para uma área administrativa de clientes.

### Requisitos:

- Autentificação
- Gerenciamento de clientes

---

Tecnologias Utilizadas:

Front-end:

- ReactJS
- Tailwindcss
- DaisyUI
- Zustand

Back-end:

- NodeJS
- NestJS
- MySQL
- Sequelize

---

## Como rodar o projeto

1 - Criar os arquivos ".env" de acordo com o ".env-sample" encontrados tanto no back-end quanto no front-end

## Back-end:

Comece instalando os pacotes do projeto:

```
yarn
```

ou

```
npm i
```

---

> Após esse processo,crie o banco de dados utilizando o seguinte comando:

```
  yarn db:init
```

ou

```
 npm run db:init
```

> Este comando será responsável por criar a base de dados e suas tabelas de maneira automatica seguindo as migrations.

Após isso basta executar a api

```
yarn start:dev
```

ou

```
npm run start:dev
```

## OBS: Está api está utilizando swagger, então para poder visualizar os endpoints, basta acessar /docs da api

## Exemplo: http://localhost:3000/v1/docs

## Front-end:

Comece instalando os pacotes do projeto:

```
yarn
```

ou

```
npm i
```

Para executar o front-end:

```
yarn dev
```

ou

```
npm run dev
---
```
