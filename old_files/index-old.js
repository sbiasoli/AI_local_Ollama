import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/ia", async (req, res) => {
    const { text } = req.body;
    const response = await axios.post("http://localhost:3000/ia", {
        model: "dolphin-llama3",
        prompt: text,
        stream: false,
});
const respData = response.data.response.toString();
res.send(respData);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
