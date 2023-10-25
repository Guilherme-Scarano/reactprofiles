const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Use a porta fornecida pelo ambiente ou 3000 como padrão

app.use(cors());
app.use(bodyParser.json());

// Dados de exemplo para simular um banco de dados
const students = [];

// Rota para listar todos os alunos
app.get("/students", (req, res) => {
  res.json(students);
});

// Rota para adicionar um novo aluno
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent); // 201 significa "Created"
});

// Rota para atualizar os dados de um aluno
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;

  // Encontre e atualize o aluno pelo ID
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    students[studentIndex] = updatedStudent;
    res.json(updatedStudent);
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

// Rota para excluir um aluno com base no ID
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  // Encontre e exclua o aluno pelo ID
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    res.json({ message: "Aluno excluído com sucesso" });
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
