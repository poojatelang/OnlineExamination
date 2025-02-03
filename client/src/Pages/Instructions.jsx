import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileRequest } from "../Redux/slices/Student";
// import { fetchQuestionsRequest } from "../Redux/slices/Quiz";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Container, Paper } from "@mui/material";

const Instruction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, loading } = useSelector((state) => state.student);

console.log(student)
// console.log(testStatus)
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; // Assuming userInfo is stored in localStorage
  // const testStatus = token ? JSON.parse(localStorage.getItem("testStatus")) : null; // Assuming userInfo is stored in localStorage

  // useEffect(() => {
  //   dispatch(fetchProfileRequest());
  // }, [dispatch]);

  const handleStartExam = () => {
    if (!student) {
      toast.error("Please log in to start the exam!");
      return;
    }

    // if (student.testStatus === "attended") {
    if (userInfo.testStatus === "attended") {
      toast.warning(
        "You have already attended the exam and cannot take it again."
      );
    } else {
      // dispatch(fetchQuestionsRequest());
      localStorage.setItem("hasStartedTest", "true"); // Store start test flag
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
            {/* {student.testStatus} */}
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
