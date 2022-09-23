import React, { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ConstructionIcon from "@mui/icons-material/Construction";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MenuHeader from "../../components/auth/MenuHeader";

const Index = () => {
  const theme = createTheme();
  theme.typography.h1 = {
    fontSize: "2.2rem",
    "@media (min-width:600px)": {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      {/* <h1>DASHBOARD</h1>
      <Link to={`/dashboard/annonces/add`} className="linkDash">
        Ajouter une nouvelle annonce
      </Link>
      <Link to={`/dashboard/categories/add`} className="linkDash">
        Ajouter une nouvelle categorie
      </Link>
       */}
      <MenuHeader />
      <ThemeProvider theme={theme}>
        <Container className="containerPage" maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography align="center" variant="h1" sx={{ mt: 8, mb: 8, p: 0 }}>
              Dashboard <ConstructionIcon />
            </Typography>
            <Box>


              <Grid container spacing={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >


                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="260"
                      image="/categorie2.png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Categorie
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Gerer, ajouter, modifier, supprimer les catégories
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={`/dashboard/categories/add`}>Ajouter</Button>
                      <Button size="small" href={`/dashboard/categories/`}>Liste des catégories</Button>
                    </CardActions>
                  </Card>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt=""
                      height="260"
                      image="/categorie3.png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Annonce
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gerer, ajouter, modifier, supprimer les annonces
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={`/dashboard/annonces/add`}>Ajouter</Button>
                      <Button size="small" href={`/dashboard/annonces/`}>Liste des annonces</Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="260"
                      image="/categorie4.png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Gerer, ajouter, supprimer les annonces
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>



               
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Index;
