import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileRequest } from "../Redux/slices/Student";
import { fetchQuestionsRequest } from "../Redux/slices/Quiz";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Paper, Box } from "@mui/material";

const Quiz = () => {
  const [count, setCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null;
  const testStatus = localStorage.getItem("testStatus");

  const { questions, loading, error } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuestionsRequest());
  }, [dispatch]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when timer reaches 0
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (ans, id) => {
    const correct = questions[id].correctAnswer.trim().toLowerCase();
    const selected = ans.trim().toLowerCase();

    setSelectedAnswers((prev) => ({
      ...prev,
      [id]: ans,
    }));

    if (selected === correct) {
      setCount((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const data = {
      correctAnswers: count,
      testStatus: "attended",
    };
    dispatch(updateProfileRequest(data));
    localStorage.setItem("testStatus", "attended");
    navigate("/result");
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Box sx={{ mt: 5 }}>
        {userInfo && (
          <Typography sx={{ mr: 2 }}>Welcome, {userInfo.name}</Typography>
        )}
      </Box>

      {questions && questions.length > 0 && (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {questions[currentQuestion]?.question || "Loading question..."}
            </Typography>

            <Typography variant="body1" color="error">
              Time Left: {timeLeft} seconds
            </Typography>

            <Box>
              {Array.from(
                new Set([
                  ...questions[currentQuestion].options,
                  questions[currentQuestion].correctAnswer,
                ])
              )
                .sort()
                .map((answer, i) => (
                  <Button
                    key={i}
                    variant={
                      selectedAnswers[currentQuestion] === answer
                        ? "contained"
                        : "outlined"
                    }
                    color={
                      selectedAnswers[currentQuestion] === answer
                        ? "primary"
                        : "inherit"
                    }
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleAnswer(answer, currentQuestion)}
                  >
                    {answer}
                  </Button>
                ))}
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Quiz;
