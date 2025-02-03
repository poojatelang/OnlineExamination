import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null;
  const isAdmin = userInfo?.role === "admin"; // Check if user is an admin

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Welcome, {userInfo?.name}! Here you can manage users, exams, and results.
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive grid
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/students-view")}
            >
              Students View
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/questions-view")}
            >
              Questions View
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/add-questions")}
            >
              Add Questions
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/update-questions")}
            >
              Update Questions
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/delete-questions")}
            >
              Delete Questions
            </Button>
          </Grid>
          {/* Uncomment and adjust if needed */}
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => handleNavigation("/delete-students")}
            >
              Delete Students
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
