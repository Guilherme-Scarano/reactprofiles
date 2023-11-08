const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Chave secreta para assinar o token JWT (deve ser mantida em segredo em um ambiente de produção)
const secretKey = "secreto";

// Função para criar um token JWT
function createToken() {
  const token = jwt.sign({}, secretKey, { expiresIn: "1h" });
  return token;
}

// Middleware de verificação do token JWT
function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

// Nome do arquivo JSON para armazenar os alunos
const dataFilePath = "students.json";

// Função para ler os dados do arquivo JSON
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir ou ocorrer um erro na leitura, retorne um array vazio
    return [];
  }
}

// Função para salvar os dados no arquivo JSON
const saveDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Rota para listar todos os alunos
app.get("/students", (req, res) => {
  const students = readDataFromFile();
  res.json(students);
});

// Rota para adicionar um novo aluno com ID gerado automaticamente
app.post("/students", verifyToken, (req, res) => {
  const newStudent = req.body;
  const id = generateUniqueId(); // Gere um ID exclusivo para o novo aluno
  newStudent.id = id; // Adicione o ID ao objeto do aluno
  const students = readDataFromFile(); // Leia os alunos do arquivo JSON
  saveDataToFile([...students, newStudent]); // Salva os alunos atualizados no arquivo JSON (incluindo o novo aluno)
  res.status(201).json(newStudent);
});

app.put("/students/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;
  const students = readDataFromFile();

  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    // Atualize as informações do aluno
    students[studentIndex] = updatedStudent;
    saveDataToFile(students); // Salve os alunos atualizados no arquivo JSON
    res.json(updatedStudent);
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

app.delete("/students/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const students = readDataFromFile();

  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    saveDataToFile(students); // Salva os alunos atualizados no arquivo JSON
    res.json({ message: "Aluno excluído com sucesso" });
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = createToken();
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
