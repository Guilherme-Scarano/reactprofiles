import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Avatar, CardHeader } from "@mui/material";

const img_styles = {
  media: {
    height: 258,
    width: 270,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10
  }
};

const PeopleCard = ({ name, turma, email, photoUrl, linkedinUrl, compartilhar}) => {
  return (
    <Card sx={{ minWidth: 210, maxWidth: 380, minHeight: 420 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={img_styles.media}
          image={photoUrl}
          alt={name}
        />
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
      <CardActions sx={{ justifyContent: "center" }}>
      <a href={compartilhar} target="_blank">
    <Button size="small" color="primary">
      Compartilhar
    </Button>
  </a>
  <a href={linkedinUrl} target="_blank">
    <Button size="small">
      LinkedIn
    </Button>
  </a>
      </CardActions>
    </Card>
  );
};

export default PeopleCard;