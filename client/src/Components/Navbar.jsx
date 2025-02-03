
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/slices/Student"; 
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check for token in localStorage
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; 
  const isAdmin = userInfo?.role === "admin";

  // Set theme on mount
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);


  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

 
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Open user menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close user menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Toggle mobile drawer
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" top="0">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Online Examination
          </Typography>

          {/* Theme Switch */}
          <Switch
            checked={theme === "dark"}
            onChange={handleThemeChange}
            sx={{ display: { xs: "none", sm: "block" } }}
          />

          {/* Admin Dashboard Button (Only visible to admins) */}
          {isAdmin && (
            <Button color="inherit" component={Link} to="/admin-dashboard">
              Dashboard
            </Button>
          )}

          {/* Desktop View: User Avatar + Menu */}
          {token ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Avatar src={userInfo?.image} alt={userInfo?.name} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem disabled>{userInfo?.name}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List>
          {token ? (
            <>
              <ListItem>
                <ListItemText primary={userInfo?.name} />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}

          {/* Theme switch inside the drawer */}
          <ListItem>
            <ListItemText primary="Dark Mode" />
            <Switch checked={theme === "dark"} onChange={handleThemeChange} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;




