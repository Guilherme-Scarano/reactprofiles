import React, { Component } from "react";
import axios from "axios";

class StudentDetail extends Component {
  state = {
    student: null,
  };

  componentDidMount() {
    // Busque os detalhes do aluno com base no ID (pode ser passado por propriedades)
    this.fetchStudentDetails();
  }

  fetchStudentDetails = async () => {
    const studentId = this.props.match.params.id; // Exemplo: usando React Router
    try {
      const response = await axios.get(`http://localhost:3000/students/${studentId}`);
      this.setState({ student: response.data });
    } catch (error) {
      console.error("Erro ao buscar detalhes do aluno:", error);
    }
  }

  handleUpdateStudent = async () => {
    // Lógica para atualizar os detalhes do aluno usando axios
  }

  handleDeleteStudent = async () => {
    // Lógica para excluir o aluno usando axios
  }

  render() {
    // Renderize os detalhes do aluno e botões de atualização/exclusão aqui
  }
}

export default StudentDetail;
