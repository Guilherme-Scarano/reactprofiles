import React, { useState } from "react";
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

const PeopleCard = ({ name, turma, email, photoUrl, linkedinUrl, studentId, handleDeleteStudent, handleEditStudent, isLoggedIn }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name, turma, email, photoUrl, linkedinUrl, id: studentId });
  const [cardData, setCardData] = useState({ id: studentId, name, turma, email, photoUrl, linkedinUrl });

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentId}`);
      handleDeleteStudent(studentId);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await handleEditStudent(studentId, editedData); // Realize a edição no servidor

      // Após uma edição bem-sucedida, atualize o estado local com os novos dados editados
      setCardData(editedData);

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao editar aluno:", error);
    }
  };

  return (
    <Card sx={{ minWidth: 210, maxWidth: 380, minHeight: 420 }} className="PeopleCard">
      {isEditing ? (
        <div>
          <CardMedia component="img" style={img_styles.media} image={photoUrl} alt={name} />
        </div>
      ) : (
        <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
          <CardActionArea title="Clique para enviar e-mail">
            <CardMedia component="img" style={img_styles.media} image={photoUrl} alt={name} />
          </CardActionArea>
        </a>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="blue" textAlign="center">
          {isEditing ? (
            <input
              type="text"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            />
          ) : (
            name
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Turma:</b>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.turma}
              onChange={(e) => setEditedData({ ...editedData, turma: e.target.value })}
            />
          ) : (
            turma
          )}{" "}
          <br />
          <b>Email:</b>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.email}
              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
            />
          ) : (
            email
          )}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
  {isLoggedIn && isEditing ? (
    <Button size="small" color="primary" onClick={handleSaveClick}>
      Salvar
    </Button>
  ) : (
    isLoggedIn && (
      <Button size="small" color="secondary" onClick={handleDeleteClick}>
        Excluir
      </Button>
    )
  )}
  {isLoggedIn && isEditing ? (
    <Button size="small" onClick={() => setIsEditing(false)}>
      Cancelar
    </Button>
  ) : (
    isLoggedIn && (
      <Button size="small" color="primary" onClick={handleEditClick}>
        Editar
      </Button>
    )
  )}
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
