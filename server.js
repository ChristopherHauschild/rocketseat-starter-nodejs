const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const port = 3001;

// Iniciando app
const app = express();
// Permite o envio de informações no formato JSON
app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect("mongodb://localhost:27017/nodeapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
requireDir("./src/models");

/* 
  -> Gerenciando todas as requisições.
  -> Enviando requisições para routes,
  onde lógica será aplicada.
*/
app.use("/api", require("./src/routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Erro ao iniciar a API");
  } else {
    console.log(`API iniciada na porta ${port}...`);
  }
});
