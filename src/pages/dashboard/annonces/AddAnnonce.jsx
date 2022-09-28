import React, { useState, useEffect } from "react";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import MenuHeader from "../../../components/auth/MenuHeader";

const AddAnnonce = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

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
  console.log(localStorage);
  // const [users, setUsers] = useState("");
  const [user_id, setUser_id] = useState("");
  const [name_annonce, setName_annonce] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategory_id] = useState("5");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [validationError, setValidationError] = useState({});

  const handleChange = (event) => {
    setCategory_id(event.target.value);
    setUser_id(event.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  //Méthode pour récupérer les catégories
  const getCategories = async () => {
    await axios.get("http://localhost:8000/api/categories").then((res) => {
      setCategories(res.data);
    });
  };







  

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  //Méthode pour récupérer les utilisateurs
  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/current-user",{
      "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
      }).then((res) => {
      setUser(res.data);
      // console.log(res.data);
    });
  };





  //Fonction d'ajout d'une annonce
  const AddAnnonce = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name_annonce", name_annonce);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("user_id", user.id);


    await axios
      .post(`http://localhost:8000/api/annonces`, formData)
      .then(navigate("/dashboard/annonces"))
      // .then(navigate(-1))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
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
            onSubmit={AddAnnonce}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" sx={{ mt: 5, p: 0 }}>
             yo {user.firstName} mon ID c'est le:{user.id}
              Ajouter une annonce
            </Typography>

            <Grid item xs={10} xl={10} sx={{ mt: 5, p: 0 }}>











              <TextField
                {...register("name_annonce", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Longueur maximale de 20 caractères",
                  },
                })}
                required
                fullWidth
                id="name_annonce"
                value={name_annonce}
                            onChange={(event) => {
                              setName_annonce(event.target.value);
                            }}
                label="Nom de l'annonce"
                autoFocus
              />

              <TextField
                sx={{ mt: 2, p: 0 }}
                required
                fullWidth
                rows={4}
                id="description"
                value={description}
                            onChange={(event) => {
                              setDescription(event.target.value);
                            }}
                label="Description"
                placeholder="Description"
                multiline
              />

              <FormControl fullWidth sx={{ mt: 2, p: 0 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Prix
                </InputLabel>
                <OutlinedInput
                  id="price"
                  value={price}
                            onChange={(event) => {
                              setPrice(event.target.value);
                            }}
                  startAdornment={
                    <InputAdornment position="start">€</InputAdornment>
                  }
                  label="Prix"
                />
              </FormControl>

              <FormControl fullWidth required sx={{ mt: 2, p: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Choisir la catégorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="name_category"
                    value={categories.name_category}
                    label="Nom de la categorie"
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name_category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              {errors.name_annonce ? (
                <Alert
                  className="errorsMessage"
                  sx={{ mt: 2, p: 0 }}
                  severity="error"
                >
                  {errors.name_annonce?.message}
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

export default AddAnnonce;
