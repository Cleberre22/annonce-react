import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import MenuHeader from "../../../components/auth/MenuHeader";

const AddCategory = () => {

const navigate = useNavigate();

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

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => console.log(data);

  const name_category = watch("name_category", "");

const [validationError, setValidationError] = useState({});

  //Fonction d'ajout d'une catégorie
  const Add = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  formData.append("name_category", name_category);

  await axios
    .post(`http://localhost:8000/api/categories`, formData)
    .then(navigate("/dashboard/categories"))
    // .then(navigate(-1))
    .catch(({ response }) => {
      if (response.status === 422) {
        setValidationError(response.data.errors);
      }
      console.log('truc');
    });
};

  return (
    <div>
      <MenuHeader />
      <ThemeProvider theme={theme}>
        <Container className="containerPage" maxWidth="xl">
          <Box
          component="form"
          noValidate
          onSubmit={Add}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" sx={{ mt: 5, p: 0 }}>
              Ajouter une categorie
            </Typography>

            <Grid item xs={10} xl={10} sx={{ mt: 5, p: 0 }}>
              <TextField
                {...register("name_category", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Longueur maximale de 20 caractères",
                  },
                })}
                required
                fullWidth
                id="name_category"
                label="Nom de la catégorie"
                autoFocus
              />

              {errors.name_category ? (
                <Alert
                  className="errorsMessage"
                  sx={{ mt: 2, p: 0 }}
                  severity="error"
                >
                  {errors.name_category?.message}
                </Alert>
              ) : (
                ""
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ajouter
              </Button>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddCategory;
