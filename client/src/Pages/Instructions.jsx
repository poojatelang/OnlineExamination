import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Container, Paper } from "@mui/material";

const Instruction = () => {
  const navigate = useNavigate();
  const { student, loading } = useSelector((state) => state.student);
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; 


  const handleStartExam = () => {
    if (!student) {
      toast.error("Please log in to start the exam!");
      return;
    }

    if (userInfo.testStatus === "attended") {
      toast.warning(
        "You have already attended the exam and cannot take it again."
      );
    } else {
      localStorage.setItem("hasStartedTest", "true"); 
      navigate("/quiz");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Online Exam
        </Typography>

        {userInfo && (
          <Typography variant="h6">
            Hello, {userInfo.name}  Status:{" "}
            {userInfo.testStatus}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleStartExam}
          disabled={loading}
        >
          {loading ? "Checking..." : "Start Exam"}
        </Button>

        <Typography variant="h4" align="center" gutterBottom>
          Online Examination Instructions
        </Typography>
        <Typography variant="body1" paragraph>
          1. The exam will consist of 10 multiple choice questions.
        </Typography>
        <Typography variant="body1" paragraph>
          2. Each question has 4 options, only one of which is correct.
        </Typography>
        <Typography variant="body1" paragraph>
          3. You will have 15 minutes to complete the exam.
        </Typography>
        <Typography variant="body1" paragraph>
          4. Once you start the exam, you cannot pause it.
        </Typography>
        <Typography variant="body1" paragraph>
          5. You can only submit the exam once it’s completed.
        </Typography>
        <Typography variant="body1" paragraph>
          6. Make sure you have a stable internet connection during the exam.
        </Typography>
        <Typography variant="body1" paragraph>
          7. Do not navigate away from the exam page during the test.
        </Typography>
        <Typography variant="body1" paragraph>
          8. You can only attempt the exam once.
        </Typography>
        <Typography variant="body1" paragraph>
          9. Your exam results will be available immediately after submission.
        </Typography>
        <Typography variant="body1" paragraph>
          10. Any form of cheating will lead to disqualification.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Instruction;
