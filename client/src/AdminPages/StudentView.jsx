// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, Grid, Typography, Paper, CircularProgress, Box, Avatar } from "@mui/material";
// import {  fetchStudentsStart } from "../Redux/slices/Admin"; // Update with the correct path

// const StudentView = () => {
//   const dispatch = useDispatch();
//   const { students, loading, error } = useSelector((state) => state.admin);
// console.log(students)
//   // Fetch students when the component mounts
//   useEffect(() => {
//     dispatch(fetchStudentsStart());
//   }, [dispatch]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         All Students
//       </Typography>
//       <Grid container spacing={3}>
//         {students.map((student) => (
//           <Grid item xs={12} sm={6} md={4} key={student.id}>
//             <Paper elevation={3} sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
//               <Avatar alt={student.name} src={student.image} sx={{ width: 100, height: 100, mb: 2 }} />
//               <Typography variant="h6">{student.name}</Typography>
//               <Typography variant="body2">Email: {student.email}</Typography>
//               <Typography variant="body2">Age: {student.age}</Typography>
//               <Typography variant="body2">Phone: {student.phoneNumber}</Typography>
//               <Typography variant="body2">Test Status: {student.testStatus==="attended" ? "Completed" : "Pending"}</Typography>
//               <Typography variant="body2">Correct Answers: {student.correctAnswers}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default StudentView;


















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, Paper, CircularProgress, Box, Avatar, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { fetchStudentsStart,deleteStudentsStart } from "../Redux/slices/Admin"; // Update with the correct path

const StudentView = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.admin);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCorrectAnswers, setFilterCorrectAnswers] = useState("");

  // Fetch students when the component mounts
  useEffect(() => {
    dispatch(fetchStudentsStart());
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteStudentsStart(id)); // Add logic in your slice for deleting a student
  };

  // Filter students based on the selected filters
  const filteredStudents = students.filter((student) => {
    const statusFilter = filterStatus ? student.testStatus === filterStatus : true;
    const correctAnswerFilter = filterCorrectAnswers ? student.correctAnswers >= filterCorrectAnswers : true;
    return statusFilter && correctAnswerFilter;
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Students
      </Typography>
      
      {/* Filters Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <FormControl variant="outlined" sx={{ width: "30%" }}>
          <InputLabel>Test Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Test Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="attended">Completed</MenuItem>
            <MenuItem value="not attended">Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: "30%" }}>
          <InputLabel>Correct Answers</InputLabel>
          <Select
            value={filterCorrectAnswers}
            onChange={(e) => setFilterCorrectAnswers(e.target.value)}
            label="Correct Answers"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
            <MenuItem value={10}>10+</MenuItem>
            <MenuItem value={15}>15+</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Student List */}
      <Grid container spacing={3}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student._id}>
            <Paper elevation={3} sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar alt={student.name} src={student.image} sx={{ width: 100, height: 100, mb: 2 }} />
              <Typography variant="h6">{student.name}</Typography>
              <Typography variant="body2">Email: {student.email}</Typography>
              <Typography variant="body2">Age: {student.age}</Typography>
              <Typography variant="body2">Phone: {student.phoneNumber}</Typography>
              <Typography variant="body2">Test Status: {student.testStatus === "attended" ? "Completed" : "Pending"}</Typography>
              <Typography variant="body2">Correct Answers: {student.correctAnswers}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(student._id)}
                sx={{ mt: 2 }}
              >
                Delete Student
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentView;
