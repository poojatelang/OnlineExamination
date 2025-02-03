import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  correctAnswers: 0,
  testStatus: "not attended",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.student = action.payload.studentinfo;
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuthenticated", "true");
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false;
      state.student = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.student = action.payload.studentinfo;
      console.log(action.payload.studentinfo);
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "userinfo",
        JSON.stringify({
          name: action.payload.studentinfo.name,
          image: action.payload.studentinfo.image,
          role: action.payload.studentinfo.role,
          testStatus: action.payload.studentinfo.testStatus,
        })
      );
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.student = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.student = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userinfo");
    },
    fetchProfileRequest: (state) => {
      state.loading = true;
    },
    fetchProfileSuccess: (state, action) => {
      state.student = action.payload;
      state.loading = false;
    },
    fetchProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.student = action.payload.studentinfo;
      console.log(action.payload.studentinfo.testStatus);
      state.loading = false;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = studentSlice.actions;

export default studentSlice.reducer;
