import React from "react";
import Grid from "@mui/material/Grid";
import PeopleCard from "../components/PeopleCard";

const PeoplePage = () => {
  const peopleData = [
    { name: "Matheus", age: 39, email: "john.doe@example.com", photoUrl:"https://avatars.githubusercontent.com/u/17969883?v=4", linkedinUrl:"https://github.com/matheuefranco", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgithub.com%2Fmatheuefranco&amp;src=sdkpreparse" },
    { name: "Guilherme", age: 21, email: "jane.smith@example.com", photoUrl:"https://ichef.bbci.co.uk/news/640/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg", linkedinUrl: "https://github.com/Guilherme-Scarano", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgithub.com%2FGuilherme-Scarano&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", age: 21, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://github.com/Luiz-Felipe123", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgithub.com%2FLuiz-Felipe123&amp;src=sdkpreparse" },
  ]; // Dados de exemplo das pessoas

  return (
    <div>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {peopleData.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PeopleCard
              name={person.name}
              idade={person.age}
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
