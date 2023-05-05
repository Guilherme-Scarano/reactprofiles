import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Avatar, CardHeader } from "@mui/material";

const PeopleCard = ({ name, idade, email, photoUrl, linkedinUrl, compartilhar}) => {
  return (
    <Card sx={{ minWidth: "100%", width: "auto", height: "100%"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={photoUrl}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="blue">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Idade: {idade} | Email: {email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
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