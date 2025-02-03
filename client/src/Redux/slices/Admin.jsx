import { createSlice } from '@reduxjs/toolkit';

// Initial state for admin
const initialState = {
  students: [],
  questions:[],
  loading: false,
  error: null,
  question:null,
};

// Admin Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchStudentsStart: (state) => {
      state.loading = true;
    },
    fetchStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    fetchStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStudentsStart: (state) => {
      state.loading = true;
    },
    deletestudentSuccess: (state, action) => {
      state.loading = false;
    //   state.students = action.payload;
    },
    delatestudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    fetchQuestionsStart: (state) => {
        state.loading = true;
      },
      fetchQuestionsSuccess: (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      },
      fetchQuestionsFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      addQuestionStart: (state) => {
        state.loading = true;
      },
      addQuestionSuccess: (state, action) =>{
        state.questions.push(action.payload);
        state.loading = false;
      },
      addQuestionFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      updateQuestionStart: (state) => {
        state.loading = true;
      },
      updateQuestionSuccess: (state, action) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
        state.loading = false;
      },
      updateQuestionFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      deleteQuestionStart: (state) => {
        state.loading = true;
      },
      deleteQuestionSuccess: (state, action) => {
        // state.questions = state.questions.filter((q) => q.id !== action.payload);
        state.loading = false;
      },
      deleteQuestionFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      fetchQuestionDetailsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchQuestionDetailsSuccess: (state, action) => {
        state.loading = false;
        state.question = action.payload;
      },
      fetchQuestionDetailsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

// Export actions
export const { fetchStudentsStart, fetchStudentsSuccess, fetchStudentsFailure ,
    deletestudentSuccess,delatestudentFailure,deleteStudentsStart,fetchQuestionsStart,
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    addQuestionStart,
    addQuestionSuccess,
    addQuestionFailure,
    updateQuestionStart,
    updateQuestionSuccess,
    updateQuestionFailure,
    deleteQuestionStart,
    deleteQuestionSuccess,
    deleteQuestionFailure,
    fetchQuestionDetailsStart,
  fetchQuestionDetailsSuccess,
  fetchQuestionDetailsFailure,
} = adminSlice.actions;

// Export the reducer
export default adminSlice.reducer;
