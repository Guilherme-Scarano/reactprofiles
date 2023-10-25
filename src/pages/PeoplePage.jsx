import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PeopleCard from "../components/PeopleCard";
import axios from "axios";

const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    turma: "",
    email: "",
    photoUrl: "",
    linkedinUrl: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setPeopleData(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/students", newStudent);
      setNewStudent({
        name: "",
        turma: "",
        email: "",
        photoUrl: "",
        linkedinUrl: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const filteredData = peopleData.filter((person) => {
    const includesSearchTerm = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterYear = filterYear === "" || person.turma.toString() === filterYear;
    return includesSearchTerm && matchesFilterYear;
  });

  const turmaYears = [...new Set(peopleData.map((person) => person.turma.toString()))];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "199vh",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <select value={filterYear} onChange={handleFilterYearChange}>
          <option value="">Mostrar todos</option>
          {turmaYears.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Formulário para cadastrar novos alunos */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Turma"
          value={newStudent.turma}
          onChange={(e) => setNewStudent({ ...newStudent, turma: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="URL da Foto"
          value={newStudent.photoUrl}
          onChange={(e) => setNewStudent({ ...newStudent, photoUrl: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="URL do LinkedIn"
          value={newStudent.linkedinUrl}
          onChange={(e) => setNewStudent({ ...newStudent, linkedinUrl: e.target.value })}
          required
        />
        <button type="submit">Cadastrar Aluno</button>
      </form>

      <Grid container spacing={3} paddingRight={"50px"} paddingTop={"50px"} paddingLeft={"50px"}>
        {filteredData.map((person, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <PeopleCard
              name={person.name}
              turma={person.turma}
              email={person.email}
              photoUrl={person.photoUrl}
              linkedinUrl={person.linkedinUrl}
              compartilhar={person.compartilhar}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PeoplePage;
