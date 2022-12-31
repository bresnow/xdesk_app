# O que é Base Express Module

è um boilerplate em express , usando ES Modules(ESM) neste repositorio temos os seguintes exemplo :

- Validação de dados usando o yup
- Api rest (CRUD de produto)
- Axios para  api de produtos num ambiente de teste
- arquivos env

## Instalação

requer Node.js v16 + para funcionar.

```sh
git clone git@github.com:kakaroto1500/base-express-mjs.git  basse-api
cd base-api
npm install
```

## Configuração do .env

renomear o arquivo example.env para .env

```sh
PORT=3333
ENDPOINT=https://jsonplaceholder.typicode.com/
```

## Iniciando Aplicação

```sh
npm run dev
```

## Validando o Ambiente de Desenvolvimento

=======

## Validando o Ambiente

acesse essa url em seu navegador

```sh
http://localhost:3333/fake
```

você deve recebe um json com uma lista de posts

```sh
  "posts": [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
```

## Duvidas e sugestão

Fique a vontade para conversa ou marca um cafe gelado pelo email : kakaroto1500@gmail.com

Nos amamos pull request e café gelado :heart:
