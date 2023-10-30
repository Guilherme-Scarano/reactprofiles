import React, { Component } from "react";
import axios from "axios";

class AddStudentForm extends Component {
  state = {
    newStudent: {
      name: "",
      turma: "",
      email: "",
      photoUrl: "",
      linkedinUrl: "",
    },
  };

  handleAddStudent = async () => {
    try {
      const response = await axios.post("http://localhost:3000/students", this.state.newStudent);
      // Lide com a resposta, talvez atualize a lista de alunos
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  render() {
    // Renderize o formulário para adicionar alunos aqui
  }
}

export default AddStudentForm;

