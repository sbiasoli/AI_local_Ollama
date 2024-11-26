import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());  // Adiciona suporte a CORS
app.use(express.json());
app.use(express.static('public'));

app.post("/ia", async (req, res) => {
    const { text } = req.body;
    console.log("Recebido texto:", text);
    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3",
            prompt: text,
            stream: false,
        });
        console.log("Resposta da API:", response.data);
        const respData = response.data.response.toString();
        res.send(respData);
    } catch (error) {
        console.error("Erro ao gerar a resposta:", error);
        res.status(500).send("Erro ao gerar a resposta");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});