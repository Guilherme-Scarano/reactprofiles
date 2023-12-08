import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PeopleCard from "../components/PeopleCard";
import axios from "axios";
import Header from "../components/Header";
import logoSI from "../img/logo-SI2.png";
import { Button as BootstrapButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://json-serverp.onrender.com/students");
      const responseData = response.data.transactions; 

      console.log("Resposta da API:", responseData); // Adiciona esta linha

      if (Array.isArray(responseData)) {
        setPeopleData(responseData);
      } else {
        console.error("Formato de dados da API inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleCancelAddStudent = () => {
    setNewStudent({
      name: "",
      turma: "",
      email: "",
      photoUrl: "",
      linkedinUrl: "",
    });
    setIsAddingStudent(false);
  };

  useEffect(() => {
    fetchStudents();
    const storedLoginStatus = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://json-serverp.onrender.com/students", newStudent);
      setNewStudent({
        name: "",
        turma: "",
        email: "",
        photoUrl: "",
        linkedinUrl: "",
      });
      fetchStudents();
      setIsAddingStudent(false);
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
  
      if (error.response) {
        // O servidor respondeu com um código de erro
        console.error("Detalhes do erro:", error.response.status);
        console.error("Mensagem de erro do servidor:", error.response.data);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.error("Sem resposta do servidor");
      } else {
        // Algo aconteceu ao configurar a solicitação
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    }
  };
  
  

  const handleEditStudent = async (studentId, updateData) => {
    try {
      const response = await axios.put(`https://json-serverp.onrender.com/students/${studentId}`, updateData);
  
      if (response.status === 200) {
        const updatedData = peopleData.map((person) => {
          if (person.id === studentId) {
            return { ...person, ...response.data }; // Use apenas response.data
          }
          return person;
        });
  
        setPeopleData(updatedData);
      } else {
        console.error("Erro ao editar aluno - status não esperado:", response.status);
      }
    } catch (error) {
      console.error("Erro ao editar aluno:", error);
    }
  };
  

  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value.toLowerCase();
  
    // Atualiza o estado searchTerm
    setSearchTerm(searchTermValue);
  };

  const handleDeleteStudent = (studentId) => {
    setPeopleData((prevData) => prevData.filter((person) => person.id !== studentId));
  };

  const handleLogout = () => {
    // ... outros códigos ...
    setIsAddingStudent(false); // Adicione esta linha para fechar o formulário de adição
    // ... outros códigos ...
  };

  const handleFilterYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const turmaYears = [...new Set(peopleData.map((person) => person.turma.toString()))];

  const openAddStudentForm = () => {
    setIsAddingStudent(true);
  };

  // Use filteredPeople no lugar de peopleData para mapear ou exibir os dados, onde for necessário

  return (
    <div>
      <Header
  isLoggedIn={isLoggedIn}
  setIsLoggedIn={setIsLoggedIn}
  openAddStudentForm={openAddStudentForm}
  setIsAddingStudent={setIsAddingStudent}  // Certifique-se de passar a função corretamente
/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center",  height: "200px", marginTop: "20px"}}>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logoSI} alt="Logo" style={{ width: "350px", height: "auto", marginTop: "20px" }} />
          </a>
        </div>

      <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou turma"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "70%",
            maxWidth: "700px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {isAddingStudent ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Card sx={{ minWidth: 390, maxWidth: 390, minHeight: 440, position: "relative", borderRadius: "5%" }} className="PeopleCard">
            <CardContent>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  size="small"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  required
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  label="Turma"
                  variant="outlined"
                  size="small"
                  value={newStudent.turma}
                  onChange={(e) => setNewStudent({ ...newStudent, turma: e.target.value })}
                  required
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  required
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  label="URL da Foto"
                  variant="outlined"
                  size="small"
                  type="url"
                  value={newStudent.photoUrl}
                  onChange={(e) => setNewStudent({ ...newStudent, photoUrl: e.target.value })}
                  required
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  label="URL do LinkedIn"
                  variant="outlined"
                  size="small"
                  type="url"
                  value={newStudent.linkedinUrl}
                  onChange={(e) => setNewStudent({ ...newStudent, linkedinUrl: e.target.value })}
                  required
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
                  <Button type="submit" variant="contained" style={{ backgroundColor: "#4070f4", color: "white", borderRadius: "20px", marginTop: "10px", marginRight: "10px", height: "40px" }}>
                    Cadastrar Aluno
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancelAddStudent}
                    style={{ backgroundColor: "red", color: "white", borderRadius: "20px", marginTop: "10px", height: "40px" }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div style={{ marginBottom: "20px", marginLeft: "5px" }}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {filterYear === "" ? "Mostrar todos" : filterYear}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterYearChange({ target: { value: "" } })}>
                Mostrar todos
              </Dropdown.Item>
              {turmaYears
                .slice()
                .sort((a, b) => a - b)
                .map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => handleFilterYearChange({ target: { value: year } })}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
  {peopleData
    .filter((person) => (
      person.name.toLowerCase().includes(searchTerm) ||
      person.email.toLowerCase().includes(searchTerm) ||
      person.turma.toLowerCase().includes(searchTerm)
    ))
    .filter((person) => (
      filterYear === "" || person.turma.toString() === filterYear
    ))
    .map((person, index) => (
      <div style={{ flex: "0 0 auto", minWidth: "300px", maxWidth: "400px", marginBottom: "20px", marginTop: "20px" }} key={index}>
        <PeopleCard
          name={person.name}
          turma={person.turma}
          email={person.email}
          photoUrl={person.photoUrl}
          linkedinUrl={person.linkedinUrl}
          compartilhar={person.compartilhar}
          studentId={person.id}
          handleDeleteStudent={handleDeleteStudent}
          handleEditStudent={handleEditStudent}
          isLoggedIn={isLoggedIn}
          setIsEditing={setIsEditing}  // Certifique-se de passar a função corretamente
        />
      </div>
    ))}
  {peopleData.length > 0 && // Verifica se há dados após a filtragem
    peopleData
      .filter((person) => (
        person.name.toLowerCase().includes(searchTerm) ||
        person.email.toLowerCase().includes(searchTerm) ||
        person.turma.toLowerCase().includes(searchTerm)
      ))
      .filter((person) => (
        filterYear === "" || person.turma.toString() === filterYear
      ))
      .length === 0 && ( // Verifica se não há resultados após a filtragem
      <p style={{ textAlign: "center", marginTop: "20px" }}>Não foi encontrado nenhum resultado.</p>
    )}
</div>

    </div>
  );
};

export default PeoplePage;
