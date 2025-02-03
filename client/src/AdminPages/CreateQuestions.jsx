// import React from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Box, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import { useDispatch } from "react-redux";
// import {addQuestionStart} from "../Redux/slices/Admin"

// const CreateQuestion = () => {
//   // Using React Hook Form
//   const { register, handleSubmit, reset,formState: { errors }, setValue } = useForm(
    
//   );
//   const dispatch=useDispatch();
//   // Function to handle form submission
//   const onSubmit = (data) => {

//     dispatch(addQuestionStart(data))
//     // Call API or dispatch action to save the question data
//     console.log("Form Data:", data);
//     reset()
//   };

//   return (
//     <Box sx={{ width: "100%", padding: 4 }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           {/* Type */}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth error={Boolean(errors.type)}>
//               <InputLabel>Type</InputLabel>
//               <Select
//                 label="Type"
//                 {...register("type", { required: "Type is required" })}
//               >
//                 <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
//                 <MenuItem value="True/False">True/False</MenuItem>
//               </Select>
//             </FormControl>
//             {errors.type && <p>{errors.type.message}</p>}
//           </Grid>

//           {/* Difficulty */}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth error={Boolean(errors.difficulty)}>
//               <InputLabel>Difficulty</InputLabel>
//               <Select
//                 label="Difficulty"
//                 {...register("difficulty", { required: "Difficulty is required" })}
//               >
//                 <MenuItem value="Easy">Easy</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Hard">Hard</MenuItem>
//               </Select>
//             </FormControl>
//             {errors.difficulty && <p>{errors.difficulty.message}</p>}
//           </Grid>

//           {/* Category */}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth error={Boolean(errors.category)}>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 label="Category"
//                 {...register("category", { required: "Category is required" })}
//               >
//                 <MenuItem value="Math">Math</MenuItem>
//                 <MenuItem value="Science">Science</MenuItem>
//                 <MenuItem value="History">History</MenuItem>
//               </Select>
//             </FormControl>
//             {errors.category && <p>{errors.category.message}</p>}
//           </Grid>

//           {/* Question */}
//           <Grid item xs={12}>
//             <TextField
//               label="Question"
//               fullWidth
//               variant="outlined"
//               {...register("question", { required: "Question is required" })}
//               error={Boolean(errors.question)}
//             />
//             {errors.question && <p>{errors.question.message}</p>}
//           </Grid>

//           {/* Options */}
//           <Grid item xs={12}>
//             <TextField
//               label="Option 1"
//               fullWidth
//               variant="outlined"
//               {...register("options.0", { required: "Option 1 is required" })}
//               error={Boolean(errors.options?.[0])}
//             />
//             {errors.options?.[0] && <p>{errors.options[0].message}</p>}
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Option 2"
//               fullWidth
//               variant="outlined"
//               {...register("options.1", { required: "Option 2 is required" })}
//               error={Boolean(errors.options?.[1])}
//             />
//             {errors.options?.[1] && <p>{errors.options[1].message}</p>}
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Option 3"
//               fullWidth
//               variant="outlined"
//               {...register("options.2", { required: "Option 3 is required" })}
//               error={Boolean(errors.options?.[2])}
//             />
//             {errors.options?.[2] && <p>{errors.options[2].message}</p>}
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Option 4"
//               fullWidth
//               variant="outlined"
//               {...register("options.3", { required: "Option 4 is required" })}
//               error={Boolean(errors.options?.[3])}
//             />
//             {errors.options?.[3] && <p>{errors.options[3].message}</p>}
//           </Grid>

//           {/* Correct Answer */}
//           {/* <Grid item xs={12}>
//             <FormControl fullWidth error={Boolean(errors.correctAnswer)}>
//               <InputLabel>Correct Answer</InputLabel>
//               <Select
//                 label="Correct Answer"
//                 {...register("correctAnswer", { required: "Correct answer is required" })}
//               >
//                 <MenuItem value="Option 1">Option 1</MenuItem>
//                 <MenuItem value="Option 2">Option 2</MenuItem>
//                 <MenuItem value="Option 3">Option 3</MenuItem>
//                 <MenuItem value="Option 4">Option 4</MenuItem>
//               </Select>
//             </FormControl>
//             {errors.correctAnswer && <p>{errors.correctAnswer.message}</p>}
//           </Grid> */}


// <Grid item xs={12}>
//             <TextField
//               label="Correct Answer (Write Answer Text)"
//               variant="outlined"
//               fullWidth
//               {...register("correctAnswer", { required: "Correct answer is required" })}
//               error={Boolean(errors.correctAnswer)}
//             />
//             {errors.correctAnswer && <p>{errors.correctAnswer.message}</p>}
//           </Grid>

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Create Question
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default CreateQuestion;
















// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import { TextField, Button, Box, Grid, FormControl } from "@mui/material";
// // import { useDispatch } from "react-redux";
// // import { addQuestionStart } from "../Redux/slices/Admin";

// // const CreateQuestion = () => {
// //   // Using React Hook Form
// //   const { register, handleSubmit, formState: { errors }, setValue } = useForm();
// //   const dispatch = useDispatch();

// //   // Function to handle form submission
// //   const onSubmit = (data) => {
// //     dispatch(addQuestionStart(data));
// //     console.log("Form Data:", data);
// //   };

// //   return (
// //     <Box sx={{ width: "100%", padding: 4 }}>
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <Grid container spacing={2}>
// //           {/* Type */}
// //           <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth error={Boolean(errors.type)}>
// //               <TextField
// //                 label="Type"
// //                 variant="outlined"
// //                 {...register("type", { required: "Type is required" })}
// //                 fullWidth
// //                 error={Boolean(errors.type)}
// //               />
// //             </FormControl>
// //             {errors.type && <p>{errors.type.message}</p>}
// //           </Grid>

// //           {/* Difficulty */}
// //           <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth error={Boolean(errors.difficulty)}>
// //               <TextField
// //                 label="Difficulty"
// //                 variant="outlined"
// //                 {...register("difficulty", { required: "Difficulty is required" })}
// //                 fullWidth
// //                 error={Boolean(errors.difficulty)}
// //               />
// //             </FormControl>
// //             {errors.difficulty && <p>{errors.difficulty.message}</p>}
// //           </Grid>

// //           {/* Category */}
// //           <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth error={Boolean(errors.category)}>
// //               <TextField
// //                 label="Category"
// //                 variant="outlined"
// //                 {...register("category", { required: "Category is required" })}
// //                 fullWidth
// //                 error={Boolean(errors.category)}
// //               />
// //             </FormControl>
// //             {errors.category && <p>{errors.category.message}</p>}
// //           </Grid>

// //           {/* Question */}
// //           <Grid item xs={12}>
// //             <TextField
// //               label="Question"
// //               fullWidth
// //               variant="outlined"
// //               {...register("question", { required: "Question is required" })}
// //               error={Boolean(errors.question)}
// //             />
// //             {errors.question && <p>{errors.question.message}</p>}
// //           </Grid>

// //           {/* Options */}
// //           {[...Array(4)].map((_, index) => (
// //             <Grid item xs={12} sm={6} key={index}>
// //               <TextField
// //                 label={`Answer ${index + 1}`}
// //                 fullWidth
// //                 variant="outlined"
// //                 {...register(`options.${index}`, { required: `Answer ${index + 1} is required` })}
// //                 error={Boolean(errors.options?.[index])}
// //               />
// //               {errors.options?.[index] && <p>{errors.options[index].message}</p>}
// //             </Grid>
// //           ))}

// //           {/* Correct Answer (TextField) */}
// //           <Grid item xs={12}>
// //             <TextField
// //               label="Correct Answer (Write Answer Text)"
// //               variant="outlined"
// //               fullWidth
// //               {...register("correctAnswer", { required: "Correct answer is required" })}
// //               error={Boolean(errors.correctAnswer)}
// //             />
// //             {errors.correctAnswer && <p>{errors.correctAnswer.message}</p>}
// //           </Grid>

// //           {/* Submit Button */}
// //           <Grid item xs={12}>
// //             <Button type="submit" variant="contained" color="primary" fullWidth>
// //               Create Question
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </form>
// //     </Box>
// //   );
// // };

// // export default CreateQuestion;

























import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addQuestionStart } from "../Redux/slices/Admin";

const CreateQuestion = () => {
  // Using React Hook Form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      difficulty: "",
      category: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  });

  const dispatch = useDispatch();

  // Function to handle form submission
  const onSubmit = (data) => {
    dispatch(addQuestionStart(data));
    console.log("Form Data:", data);
    reset(); // Reset form after submission
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.type)}>
              <InputLabel>Type</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select {...field} defaultValue="">
                    <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                    <MenuItem value="True/False">True/False</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {errors.type && <p>{errors.type.message}</p>}
          </Grid>

          {/* Difficulty */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.difficulty)}>
              <InputLabel>Difficulty</InputLabel>
              <Controller
                name="difficulty"
                control={control}
                rules={{ required: "Difficulty is required" }}
                render={({ field }) => (
                  <Select {...field} defaultValue="">
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {errors.difficulty && <p>{errors.difficulty.message}</p>}
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.category)}>
              <InputLabel>Category</InputLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select {...field} defaultValue="">
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {errors.category && <p>{errors.category.message}</p>}
          </Grid>

          {/* Question */}
          <Grid item xs={12}>
            <TextField
              label="Question"
              fullWidth
              variant="outlined"
              {...register("question", { required: "Question is required" })}
              error={Boolean(errors.question)}
            />
            {errors.question && <p>{errors.question.message}</p>}
          </Grid>

          {/* Options */}
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Option ${index + 1}`}
                fullWidth
                variant="outlined"
                {...register(`options.${index}`, { required: `Option ${index + 1} is required` })}
                error={Boolean(errors.options?.[index])}
              />
              {errors.options?.[index] && <p>{errors.options[index].message}</p>}
            </Grid>
          ))}

          {/* Correct Answer */}
          <Grid item xs={12}>
            <TextField
              label="Correct Answer (Write Answer Text)"
              variant="outlined"
              fullWidth
              {...register("correctAnswer", { required: "Correct answer is required" })}
              error={Boolean(errors.correctAnswer)}
            />
            {errors.correctAnswer && <p>{errors.correctAnswer.message}</p>}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Question
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateQuestion;
