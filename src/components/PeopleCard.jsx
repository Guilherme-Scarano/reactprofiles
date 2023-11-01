import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import axios from "axios";


const img_styles = {
  media: {
    height: 258,
    width: 270,
    paddingLeft: 50,
    paddingRight:50,
    paddingTop: 10,
  },
};

const PeopleCard = ({ name, turma, email, photoUrl, linkedinUrl, studentId, handleDeleteStudent }) => {
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentId}`);
      handleDeleteStudent(studentId); // Chame a função passada como prop
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  }

  const handleShare = async (name, url) => {
    try {
      await navigator.share({
        title: "Compartilhar",
        text: `Confira ${name} no LinkedIn!`,
        url: url,
      });
      console.log("Conteúdo compartilhado com sucesso!");
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <Card sx={{ minWidth: 210, maxWidth: 380, minHeight: 420 }} className="PeopleCard">
      <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
        <CardActionArea title="Clique para enviar e-mail">
          <CardMedia component="img" style={img_styles.media} image={photoUrl} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="blue" textAlign="center">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Turma:</b> {turma} <br />
              <b>Email:</b> {email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <CardActions sx={{ justifyContent: "center" }}>
      <Button size="small" color="secondary" onClick={() => handleDeleteClick(studentId)}>
        Excluir
      </Button>
        <Button size="small" color="primary" onClick={() => handleShare(name, linkedinUrl)}>
          Compartilhar
        </Button>
        <a href={linkedinUrl} target="_blank">
          <Button size="small">LinkedIn</Button>
        </a>
      </CardActions>
    </Card>
  );
};

export default PeopleCard;
