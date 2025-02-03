
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

  const onSubmit = (data) => {
    dispatch(addQuestionStart(data));
    console.log("Form Data:", data);
    reset(); 
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
