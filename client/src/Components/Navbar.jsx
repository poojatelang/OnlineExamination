// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Switch, Drawer, List, ListItem, ListItemText } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../Redux/slices/Student"; // Import your logout action
// import MenuIcon from "@mui/icons-material/Menu";

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null); // For user menu dropdown
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state for mobile view
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Check for token in localStorage
//   const token = localStorage.getItem("token");
//   const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; // Assuming userInfo is stored in localStorage
//   const isAdmin = userInfo?.role === "admin"; // Check if the user is an admin

//   // Toggle theme between light and dark
//   const handleThemeChange = (event) => {
//     const newTheme = event.target.checked ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme); // Save theme preference
//     document.body.setAttribute("data-theme", newTheme); // Update body theme
//   };

//   // Logout user
//   const handleLogout = () => {
//     dispatch(logout()); // Trigger logout action
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     navigate("/login"); // Navigate to login page
//   };

//   // Handle user info menu
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Open and close drawer on mobile
//   const toggleDrawer = (open) => {
//     setDrawerOpen(open);
//   };

//   // Menu items based on token
//   const menuItems = token
//     ? [
//         { text: "Profile", onClick: handleMenuOpen },
//         { text: "Logout", onClick: handleLogout },
//       ]
//     : [
//         { text: "Login", to: "/login" },
//         { text: "Register", to: "/register" },
//       ];

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             My App
//           </Typography>

//           {/* Theme Switch */}
//           <Switch checked={theme === "dark"} onChange={handleThemeChange} sx={{ display: { xs: "none", sm: "block" } }} />




//           {isAdmin && ( // Show Dashboard link only for admin
//           <Button color="inherit" component={Link} to="/admin-dashboard">
//             Dashboard
//           </Button>
//         )}
//           {/* Desktop View: Show user info and logout */}
//           {token ? (
//             <>
//               <IconButton color="inherit" onClick={handleMenuOpen} sx={{ display: { xs: "none", sm: "block" } }}>
//                 <Avatar src={userInfo?.image} alt={userInfo?.name} />
//               </IconButton>
//               <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                 <MenuItem disabled>{userInfo?.name}</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <div sx={{ display: { xs: "none", sm: "block" } }}>
//               <Button color="inherit" component={Link} to="/login">
//                 Login
//               </Button>
//               <Button color="inherit" component={Link} to="/register">
//                 Register
//               </Button>
//             </div>
//           )}

//           {/* Mobile Menu Icon */}
//           <IconButton edge="end" color="inherit" onClick={() => toggleDrawer(true)} sx={{ display: { xs: "block", sm: "none" } }}>
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for mobile view */}
//       <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem button key={index} component={item.to ? Link : "div"} to={item.to || "#"} onClick={item.onClick}>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           ))}
//           {/* Theme switch inside the drawer */}
//           <ListItem>
//             <Switch checked={theme === "dark"} onChange={handleThemeChange} />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;






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
import { logout } from "../Redux/slices/Student"; // Import your logout action
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // User menu state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [drawerOpen, setDrawerOpen] = useState(false); // Mobile drawer state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check for token in localStorage
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; // Use "userInfo" consistently
  const isAdmin = userInfo?.role === "admin";

  // Set theme on mount
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle theme
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // Logout
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
      <AppBar position="static">
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
                <MenuItem onClick={handleMenuClose} disabled>{userInfo?.name}</MenuItem>
               
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




