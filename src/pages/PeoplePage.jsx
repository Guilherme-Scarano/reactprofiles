import React from "react";
import Grid from "@mui/material/Grid";
import PeopleCard from "../components/PeopleCard";

const PeoplePage = () => {
  const peopleData = [
    { name: "Matheus", turma: 2023, email: "john.doe@example.com", photoUrl:"https://avatars.githubusercontent.com/u/17969883?v=4", linkedinUrl:"https://br.linkedin.com/in/matheus-franco-34ba1019", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fmatheus-franco-34ba1019&amp;src=sdkpreparse" },
    { name: "Guilherme", turma: 2023, email: "jane.smith@example.com", photoUrl:"https://ichef.bbci.co.uk/news/640/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg", linkedinUrl: "https://br.linkedin.com/in/guilherme-scarano-8400a425a", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fguilherme-scarano-8400a425a&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
    { name: "Luiz Felipe", turma: 2023, email: "mark.johnson@example.com", photoUrl:"https://petcare.com.br/wp-content/uploads/2019/02/caes-ouvem-o-que-falamos.jpg", linkedinUrl: "https://br.linkedin.com/in/luiz-felipe-silva-9aa8a726b", compartilhar: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fluiz-felipe-silva-9aa8a726b&amp;src=sdkpreparse" },
  ]; // Dados de exemplo das pessoas

  return (
    <div>
      <Grid container spacing={3} paddingRight={"50px"} paddingTop={"50px"} paddingLeft={"50px"}>
        {peopleData.map((person, index) => (
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
