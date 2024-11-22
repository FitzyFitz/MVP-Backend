import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
}

// Configura o armazenamento das imagens em disco
const storage = multer.diskStorage({
    // Define o diretório de destino para as imagens
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage });
// Para Linux ou Mac, a configuração pode ser simplificada
// const upload = multer({ dest: "./uploads" });

// Define as rotas da aplicação
const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    
    // Rota para listar todos os posts
    app.get("/posts", listarPosts);
    
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);
    
    // Rota para upload de imagem
    // O parâmetro 'single("imagem")' indica que estamos esperando um único arquivo com o nome "imagem"
    // O middleware 'upload.single("imagem")' irá lidar com o upload do arquivo e adicioná-lo ao objeto req
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;