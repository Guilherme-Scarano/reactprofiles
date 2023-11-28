import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const img_styles = {
  media: {
    height: 150,
    width: 150,
    borderRadius: "50%",
    backgroundColor: "#fff",
    padding: 3,
    margin: "auto",
    marginBottom: 10,
    marginTop: 15,
    cursor: "pointer",
  },
};

const PeopleCard = ({ name, turma, email, photoUrl, linkedinUrl, studentId, handleDeleteStudent, handleEditStudent, isLoggedIn }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name, turma, email, photoUrl, linkedinUrl, id: studentId });

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentId}`);
      handleDeleteStudent(studentId);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await handleEditStudent(studentId, editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao editar aluno:", error);
    }
  };

  const handleShare = async () => {
    // Lógica de compartilhamento
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Compartilhar",
          text: `Confira ${name} no LinkedIn!`,
          url: linkedinUrl,
        });
        console.log("Conteúdo compartilhado com sucesso!");
      } else {
        console.log("Compartilhamento não suportado. Implementando fallback...");

        // Exibir uma mensagem indicando que a opção não é suportada
        alert("Opção de compartilhamento não suportada pelo navegador.");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  const handleLogout = () => {
    setIsEditing(false); // Adicione esta linha para cancelar a edição
    // ... outros códigos ...
  };

  return (
    <Card sx={{ minWidth: 390, maxWidth: 390, minHeight: 440, position: "relative", borderRadius: "5%" }} className="PeopleCard">
      <div className="cover" />
      <CardMedia
        title="Clique para enviar e-mail"
        component="img"
        style={{
          ...img_styles.media,
          marginTop: 20,
          zIndex: 1,
          position: "relative",
          border: "4px solid #4070f4",
        }}
        image={photoUrl}
        alt={name}
        onClick={handleEmailClick}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" textAlign="center" style={{ fontSize: "1.4rem" }}>
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField
              label="Nome"
              variant="outlined"
              size="small"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Turma"
              variant="outlined"
              size="small"
              value={editedData.turma}
              onChange={(e) => setEditedData({ ...editedData, turma: e.target.value })}
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={editedData.email}
              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              style={{ marginBottom: "10px", width: "100%" }}
            />
          </div>
        ) : (
          <><b>{name}</b></>
        )}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" style={{ fontSize: "1rem"}}>
        {!isEditing && (
          <>
            <b>Turma:</b> {turma} <br />
            <b>Email:</b> {email}
          </>
        )}
      </Typography>
      </CardContent>
      <Grid container justifyContent="center" spacing={1} alignItems="center">
        {isLoggedIn && isEditing ? (
          <>
            <Grid item>
              <Button
                size="small"
                style={{
                  backgroundColor: "#4070f4",
                  color: "white",
                  borderRadius: "20px",
                  marginRight: "8px", // Adicionei a propriedade marginRight
                  marginBottom: "20px", // Adiciona margem inferior
                }}
                onClick={handleSaveClick}
              >
                Salvar
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "20px",
                  marginBottom: "20px", // Adiciona margem inferior
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </Grid>
          </>
        ) : (
          isLoggedIn && (
            <Grid item>
              <Button
                size="small"
                style={{
                  backgroundColor: "#4070f4",
                  color: "white",
                  borderRadius: "20px",
                  marginRight: "8px", // Adicionei a propriedade marginRight
                  marginTop: "30px"
                }}
                onClick={handleEditClick}
              >
                Editar
              </Button>
            </Grid>
          )
        )}
        {(isLoggedIn || linkedinUrl) && !isEditing && (
          <>
            <Grid item>
              <Button
                size="small"
                style={{
                  backgroundColor: "#4070f4",
                  color: "white",
                  borderRadius: "15px",
                  marginRight: "8px", // Adicionei a propriedade marginRight
                  marginTop: "30px"
                }}
                onClick={handleShare}
              >
                Compartilhar
              </Button>
            </Grid>
            {linkedinUrl && (
              <Grid item>
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#4070f4",
                      color: "white",
                      borderRadius: "20px",
                      marginRight: "8px",
                      marginTop: "30px"
                    }}
                  >
                    LinkedIn
                  </Button>
                </a>
              </Grid>
            )}
          </>
        )}
        {isLoggedIn && !isEditing && (
          <Grid item>
            <Button
              size="small"
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "20px",
                marginTop: "30px"
              }}
              onClick={handleDeleteClick}
            >
              Excluir
            </Button>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default PeopleCard;