const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { client } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req, res) => {
  client.connect();
  const query = `select * from client`;
  client.query(query, (err, res) => {
    if (err) {
      console.error(err);
      client.end();
        return;
    }
    console.log(res.rows);
    client.end();
  });
  res.json({ message: "GET executado." });
});

app.post("/", (req, res) => {
  client.connect();
  console.log(req.body);

  const valor = Number(req.body.valor) 
  const tempo = Number(req.body.tempo) 

  const sql = `insert into client(nome,telefone,email,valor,tempo) 
  values ($1,$2,$3,$4,$5)`;
  const values = [req.body.nome, req.body.telefone, req.body.email, valor, tempo];
  client.query(sql, values);
  client.end();

  res.json({ message: "res"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🔥😈Server is running on port ${PORT}.`);
});
