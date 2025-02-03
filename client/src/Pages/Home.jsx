import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const onStartExam = () => {
    navigate("/instruction");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center", borderRadius: 2 }}>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography variant="h3" color="primary" gutterBottom>
              Welcome to the Online Examination
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Get ready to test your knowledge and skills!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <form onSubmit={handleSubmit(onStartExam)}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Start Exam
              </Button>
            </form>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default HomePage;
