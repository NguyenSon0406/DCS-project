import React, { useState, useEffect } from 'react';
import Notifications from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, Container, Button, Tooltip, MenuItem } from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import axios from "axios";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none",
  },
});

function Navbar() {

  let currentlyHovering = false;
  const styles = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function handleHover() {
    currentlyHovering = true;
  }
  const [anchorPostEl, setAnchorPostEl] = useState(null);
  const [anchorReEl, setAnchorReEl] = useState(null);
  function handleClick(event) {
    if (anchorPostEl !== event.currentTarget) {
      setAnchorPostEl(event.currentTarget);
    }
  }
  function handleClick1(event) {
    if (anchorReEl !== event.currentTarget) {
      setAnchorReEl(event.currentTarget);
    }
  }
  function handleClose() {
    setAnchorPostEl(null);
  }
  function handleClose1() {
    setAnchorReEl(null);
  }
  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }
  function handleCloseHover1() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose1();
      }
    }, 50);
  }

  //fetch user information
  const auth = useSelector(state => state.auth);
  const { user, role} = auth;

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken')
      await axios.get('/user/logout')
      localStorage.removeItem('firstLogin')
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  }
  return (
    <AppBar position="static" color='error' style={{ color: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            DTU <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>CONNECTIONS</Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="post" style={{ color: "black" }}>Post</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="recruitment" style={{ color: "black" }}>Recruitment</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="post" style={{ color: "black" }}>Blog</Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            DTU CONNECTIONS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              aria-owns={anchorPostEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              onMouseOver={handleClick}
              onMouseLeave={handleCloseHover}
              sx={{ my: 2, color: 'white', display: 'block', fontWeight: "bold", zIndex: 1301 }}
            >
              <Link to="post" style={{ color: "white" }}>Post</Link>
              <Menu
                id="simple-menu"
                anchorEl={anchorPostEl}
                open={Boolean(anchorPostEl)}
                onClose={handleClose}
                MenuListProps={{
                  onMouseEnter: handleHover,
                  onMouseLeave: handleCloseHover,
                  style: { pointerEvents: "auto" },
                }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                PopoverClasses={{
                  root: styles.popOverRoot,
                }}
              >
                <MenuItem onClick={handleClose}>Newest</MenuItem>
                <MenuItem onClick={handleClose}>My post</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="post/create">Create post</Link>
                </MenuItem>
              </Menu>
            </Button>

            <Button
              aria-owns={anchorReEl ? "simple-menu2" : undefined}
              aria-haspopup="true"
              onClick={handleClick1}
              onMouseOver={handleClick1}
              onMouseLeave={handleCloseHover1}
              sx={{ my: 2, color: 'white', display: 'block', fontWeight: "bold", zIndex: 1301 }}
            >
             {(role!==1) ? ( <Link to="recruitment/newest" style={{ color: "white" }}>Recruitment</Link>) : "Recruitment"}
            </Button>
            {
              (role === 1) ? (
                <Menu
              id="simple-menu2"
              anchorEl={anchorReEl}
              open={Boolean(anchorReEl)}
              onClose={handleClose1}
              MenuListProps={{
                onMouseEnter: handleHover,
                onMouseLeave: handleCloseHover1,
                style: { pointerEvents: "auto" }
              }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              PopoverClasses={{
                root: styles.popOverRoot,
              }}
            >
              <MenuItem onClick={handleClose1}><Link to="recruitment/newest" style={{ color: "black" }}>Newest</Link></MenuItem>
              <MenuItem onClick={handleClose1}><Link to="recruitment/myjobpost" style={{ color: "black" }}>My Recruitment Post</Link></MenuItem>
            </Menu>
              ) : ""
            }
            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', fontWeight: "bold" }}
            >
              <Link to="liststudent" style={{ color: "white" }}>Student</Link>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0.05 }}>
            <IconButton sx={{ color: "#fff" }}>
              <Badge color="primary" badgeContent={3} >
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} size="small" sx={{ p: 0 }}>
                <img src={user.avatar} alt="avatar" style={{ verticalAlign: "middle", margin: 0, width: "40px", height: "40px", borderRadius: "50%" }} />
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
              <MenuItem>
                <Link to="profile" style={{ color: "black" }}>
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Sign out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
