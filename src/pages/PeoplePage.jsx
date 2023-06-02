import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PeopleCard from "../components/PeopleCard";
import jsonData from "./database.json";

const PeoplePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [filterYear, setFilterYear] = useState(""); // Estado para o ano do filtro
  const peopleData = jsonData.people;

  // Filtra os dados com base no termo de pesquisa e no ano do filtro
  const filteredData = peopleData.filter((person) => {
    const includesSearchTerm = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterYear = filterYear === "" || person.turma.toString() === filterYear;
    return includesSearchTerm && matchesFilterYear;
  });

  // Manipula a mudança no termo de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Manipula a mudança no ano do filtro
  const handleFilterYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  // Obtém os anos únicos das turmas
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
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
      </div>
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