const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
};

// Função para salvar os dados no arquivo JSON
const saveDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// Rota para listar todos os alunos
app.get("/students", (req, res) => {
  const students = readDataFromFile();
  res.json(students);
});

app.post("/students", (req, res) => {
  const newStudent = req.body;
  const students = readDataFromFile();
  students.push(newStudent);
  saveDataToFile(students); // Salva os alunos atualizados no arquivo JSON
  res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;
  const students = readDataFromFile();

  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    students[studentIndex] = updatedStudent;
    saveDataToFile(students); // Salva os alunos atualizados no arquivo JSON
    res.json(updatedStudent);
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

app.delete("/students/:id", (req, res) => {
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

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
