import React, { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import MenuHeader from "../../../components/auth/MenuHeader";

const Categories = () => {
  // const navigate = useNavigate();

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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    displayCategories();
  }, []); // Sans les crochets ça tourne en boucle

  const displayCategories = async () => {
    await axios.get("http://localhost:8000/api/categories").then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  };

  const deleteCategory = (category) => {
    axios
      .delete(`http://localhost:8000/api/categories/${category}`)
      .then(displayCategories);
  };

  return (
    <div>
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
              Listes des catégories
            </Typography>

            <Box>
              <Button
                sx={{ mt: 5, maxWidth: 850 }}
                variant="contained"
                disableElevation
                href={`/dashboard/categories/add`}
              >
                Ajouter une catégorie
              </Button>

              <TableContainer
                component={Paper}
                sx={{ mt: 2, p: 0, maxWidth: 850 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Nom de la catégorie</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {categories.map((category) => (
                      // {rows.map((row) => (
                      <TableRow
                        key={categories.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {category.id}
                        </TableCell>
                        <TableCell align="center">
                          {category.name_category}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={`/dashboard/categories/edit/${category.id}`}
                            className="btn btn-success mb-2"
                          >
                            <IconButton aria-label="edit" size="large">
                              <ModeEditOutlineIcon
                                fontSize="inherit"
                                color="info"
                              />
                            </IconButton>
                          </Link>

                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              deleteCategory(category.id);
                            }}
                          >
                            <DeleteIcon fontSize="inherit" color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Categories;
