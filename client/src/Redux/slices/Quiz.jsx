import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuestionsRequest: (state) => {
      state.loading = true;
    },
    fetchQuestionsSuccess: (state, action) => {
      state.questions = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchQuestionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuestionsRequest,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} = quizSlice.actions;

export default quizSlice.reducer;
