// import React, { useEffect, useState } from "react";
// import {  useNavigate, useParams } from "react-router-dom";
// import { Box, Typography, TextField, Button, Grid } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { fetchQuestionDetailsStart, updateQuestionStart } from "../Redux/slices/Admin"; // Assuming you have a slice for fetching and updating questions

// const EditQuestion = () => {
//   const { id } = useParams(); // Get the question ID from the URL
//   const dispatch = useDispatch();
// //   const history = useHistory();
//   const navigate = useNavigate();
//   const { question } = useSelector((state) => state.admin); // Assuming your state contains the current question details

//   const { control, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     // Fetch the question details when the page loads
//     dispatch(fetchQuestionDetailsStart(id));
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (question) {
//       // Pre-fill the form fields with existing question details
//       setValue("question", question.question);
//       setValue("type", question.type);
//       setValue("category", question.category);
//       setValue("difficulty", question.difficulty);
//       setValue("options", question.options.join(", "));
//       setValue("correctAnswer", question.correctAnswer);
//     }
//   }, [question, setValue]);

//   const onSubmit = (data) => {
//     // Dispatch the update action
//     console.log(data)
//     dispatch(updateQuestionStart({ id, data }));
//     navigate("/questions-view"); // Redirect back to the questions list page
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>Edit Question</Typography>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Controller
//               name="question"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Question"
//                   fullWidth
//                   variant="outlined"
//                   required
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Controller
//               name="type"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Type" fullWidth variant="outlined" />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Category" fullWidth variant="outlined" />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Controller
//               name="difficulty"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Difficulty" fullWidth variant="outlined" />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="options"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Options (comma separated)"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="correctAnswer"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Correct Answer"
//                   fullWidth
//                   variant="outlined"
//                   required
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit">
//               Update Question
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default EditQuestion;



















import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { fetchQuestionDetailsStart, updateQuestionStart } from "../Redux/slices/Admin";
import { Add, Remove } from "@mui/icons-material";

const EditQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { question } = useSelector((state) => state.admin);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      question: "",
      type: "",
      category: "",
      difficulty: "",
      options: [{ value: "" }, { value: "" }], // At least two options by default
      correctAnswer: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    dispatch(fetchQuestionDetailsStart(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (question) {
      setValue("question", question.question || "");
      setValue("type", question.type || "");
      setValue("category", question.category || "");
      setValue("difficulty", question.difficulty || "");
      setValue(
        "options",
        question.options?.map((opt) => ({ value: opt })) || [{ value: "" }]
      );
      setValue("correctAnswer", question.correctAnswer || "");
    }
  }, [question, setValue]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      options: data.options.map((opt) => opt.value), // Convert objects to string array
    };

    dispatch(updateQuestionStart({ id, data: formattedData }));
    console.log({ id, data: formattedData })
    navigate("/questions-view");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Question</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Question" fullWidth variant="outlined" required />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Type" fullWidth variant="outlined" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Category" fullWidth variant="outlined" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Difficulty" fullWidth variant="outlined" />
              )}
            />
          </Grid>

          {/* Options Fields */}
          <Grid item xs={12}>
            <Typography variant="h6">Options</Typography>
          </Grid>
          {fields.map((item, index) => (
            <Grid item xs={12} key={item.id} container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <Controller
                  name={`options.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label={`Option ${index + 1}`} fullWidth variant="outlined" required />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                {fields.length > 2 && (
                  <IconButton onClick={() => remove(index)} color="error">
                    <Remove />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => append({ value: "" })}
            >
              Add Option
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="correctAnswer"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Correct Answer" fullWidth variant="outlined" required />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Update Question
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditQuestion;
