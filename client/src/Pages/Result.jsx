import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";

const ResultPage = () => {
  const navigate = useNavigate();
  const { student } = useSelector((state) => state.student);
  const { questions } = useSelector((state) => state.quiz);
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/result");
    };
  }, [navigate]);

  const totalQuestions = questions.length;
  const scorePercentage = (student.correctAnswers / totalQuestions) * 100;
  const passThreshold = 50;
  const isPassed = scorePercentage >= passThreshold;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Exam Result
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Candidate: {userInfo?.name}
          </Typography>
          <Box
            sx={{
              my: 3,
              p: 2,
              border: "1px solid",
              borderRadius: 2,
              bgcolor: isPassed ? "success.light" : "error.light",
            }}
          >
            <Typography variant="h6" color={isPassed ? "green" : "red"}>
              {isPassed
                ? "Congratulations! You Passed 🎉"
                : "Better Luck Next Time ❌"}
            </Typography>
          </Box>
          <Typography variant="body1">
            Total Questions: {totalQuestions}
          </Typography>
          <Typography variant="body1">
            Correct Answers: {student.correctAnswers}
          </Typography>
          <Typography variant="body1">
            Score: {scorePercentage.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResultPage;
