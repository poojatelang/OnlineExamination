// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { Box, Grid, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { fetchQuestionsStart ,deleteQuestionStart} from "../Redux/slices/Admin"; // Assuming you have a slice for fetching questions

// const ReadQuestions = () => {
// //   const [questions, setQuestions] = useState([]);
//   const dispatch = useDispatch();
// const {questions}=useSelector((state)=>state.admin)
//   // React Hook Form setup
//   const { register, handleSubmit } = useForm();

//   useEffect(() => {
//     // Fetch questions from the backend when the component mounts
//     dispatch(fetchQuestionsStart()); // You can replace this with an actual API call to get data
//   }, [dispatch]);


//   const handleDelete=(id)=>{
//     dispatch(deleteQuestionStart(id))

//   }

//   // Handling the form submission (optional)
//   const onSubmit = (data) => {
//     console.log(data); // Handle form data submission if needed (like for editing or deleting)
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         All Questions
//       </Typography>
      
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Optional Form Inputs */}
//       </form>

//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Question</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Difficulty</TableCell>
//               <TableCell>Correct Answer</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {questions.map((question) => (
//               <TableRow key={question.id}>
//                 <TableCell>{question.question}</TableCell>
//                 <TableCell>{question.type}</TableCell>
//                 <TableCell>{question.category}</TableCell>
//                 <TableCell>{question.difficulty}</TableCell>
//                 <TableCell>{question.correctAnswer}</TableCell>
//                 <TableCell>
//                   {/* Edit and Delete buttons */}
//                   <Button variant="contained" color="primary" size="small" sx={{ marginRight: 1 }}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="secondary" size="small" onClick={()=>handleDelete(question._id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ReadQuestions;

































import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchQuestionsStart, deleteQuestionStart } from "../Redux/slices/Admin"; // Assuming you have a slice for fetching questions

const ReadQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { questions } = useSelector((state) => state.admin);

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    dispatch(fetchQuestionsStart());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteQuestionStart(id));
  };

  const handleEdit = (id) => {
    // Navigate to the edit page and pass the question id as a state
    navigate(`/update-questions/${id}`); // use navigate() instead of history.push()
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
                {/* <TableCell>{question.options.join(", ")}</TableCell> */}
                <TableCell>{Array.isArray(question.options) ? question.options.join(", ") : "N/A"}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
                <TableCell>
                  {/* Edit and Delete buttons */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleEdit(question._id)} // Edit button logic
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(question._id)} // Delete button logic
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
