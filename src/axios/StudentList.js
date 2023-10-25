import React, { Component } from "react";
import axios from "axios";

class StudentList extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      this.setState({ students: response.data });
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }

  render() {
    // Renderize a lista de alunos aqui
  }
}

export default StudentList;
