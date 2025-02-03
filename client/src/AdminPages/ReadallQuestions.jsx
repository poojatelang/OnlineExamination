import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { fetchQuestionsStart, deleteQuestionStart } from "../Redux/slices/Admin"; 
const ReadQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { questions } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchQuestionsStart());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteQuestionStart(id));
  };

  const handleEdit = (id) => {
    navigate(`/update-questions/${id}`); 
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Questions
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="questions table">
          <TableHead>
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question,index) => (
              <TableRow key={question._id||index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.type}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>{question.difficulty}</TableCell>
                <TableCell>{Array.isArray(question.options) ? question.options.join(", ") : "N/A"}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleEdit(question._id)} 
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(question._id)} 
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReadQuestions;
