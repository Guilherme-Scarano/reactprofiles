import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PeopleCard from "../components/PeopleCard";
import jsonData from "./database.json";

const PeoplePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const peopleData = jsonData.people;

  // Filter the data based on the search term
  const filteredData = peopleData.filter((person) => {
    const values = Object.values(person).map((value) =>
      value.toString().toLowerCase()
    );
    return values.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
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

