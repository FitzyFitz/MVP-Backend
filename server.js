import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Importa o framework Express.js, que será utilizado para criar a aplicação web.

const app = express();
// Cria uma instância do Express.js, que será o ponto de partida da aplicação.
routes(app)

app.listen(3000, () => {
    // Inicia o servidor na porta 3000 e exibe uma mensagem no console indicando que o servidor está ouvindo.
    console.log("Servidor escutando...");
});