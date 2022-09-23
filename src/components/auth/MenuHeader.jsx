import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useNavigate } from "react-router-dom";

// const pages = ["Login", "Register"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const token = localStorage.getItem("access_token");
  // console.log(token);
  const userLogged = !token;

  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle
  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/current-user",{
      "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
      }).then((res) => {
      setUser(res.data);
      setRole(res.data.role);
      // console.log(res.data.role);
    });
  };
  // console.log(role);

  const removeToken = () => {
    localStorage.removeItem("access_token");
    //   setIsLoggedin(false);
    navigate("/home");
  };

  return (
    <div>
 <AppBar position="static">
      <Container className="menuHeader">
        <Toolbar disableGutters>
          {/* -------------------------------------------------------------------- DESCKTOP LOGO */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DESCKTOP
          </Typography>

          {/* -------------------------------------------------------------------- MENU MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} className="menuHeader">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => ( */}
              {role === "ADMIN" ? (
                <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component="a"
                  href="/dashboard/index"
                >
                  Dashboard
                </Typography>
              </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component="a"
                  href="/dashboard/index"
                >
                  Dashboardeueueu
                </Typography>
              </MenuItem>
              )}
             

              {userLogged ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="a" href="/login">
                    Connexion
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={removeToken}>
                  <Typography textAlign="center">
                    Deconnexion
                  </Typography>
                </MenuItem>
              )}

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component="a" href="/register">
                  Inscription
                </Typography>
              </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>

          {/* -------------------------------------------------------------------- LOGO MOBILE */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOBILE
          </Typography>

          {/* -------------------------------------------------------------------- MENU DESCKTOP */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => ( */}
            <Button
              // key={page}
              component="a"
              href="/dashboard/index"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>

            <Button
              // key={page}
              component="a"
              href="/register"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Inscription
            </Button>
            {/* ))} */}

            {userLogged ? (
              <Button
                // key={page}
                component="a"
                href="/login"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Connexion
              </Button>
            ) : (
              <Button
                // key={page}
                component="a"
                onClick={removeToken}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                déconnection
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="onePiece.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profil</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Compte</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              {userLogged ? (
                <MenuItem
                  component="a"
                  href="/login"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Connexion</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={removeToken}>
                  <Typography textAlign="center">Deconnection</Typography>
                </MenuItem>
              )}
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
   
  );
};
export default ResponsiveAppBar;
