import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "../slices/Student";
import { toast } from "react-toastify";
import api from "../../Utils/Api"; // API helper


function* registerSaga(action) {
  try {
    const registerResponse = yield call(
      api.post,
      "/auth/register",
      action.payload
    );
    yield put(registerSuccess(registerResponse.data));
    toast.success(registerResponse.data.message);
    const loginPayload = {
      email: action.payload.email,
      password: action.payload.password,
    };
    const loginResponse = yield call(api.post, "/auth/login", loginPayload);
    yield put(loginSuccess(loginResponse.data));
    localStorage.setItem("token", loginResponse.data.token);
    toast.success(loginResponse.data.message);
  } catch (error) {
    yield put(registerFailure(error.response?.data || "Registration failed"));
    toast.error(error.response.data.message);
  }
}


function* loginSaga(action) {
  try {
    const response = yield call(api.post, "/auth/login", action.payload);

    // ✅ Ensure response.data exists
    if (!response.data || !response.data.studentinfo) {
      throw new Error("Invalid response structure");
    }

    yield put(loginSuccess(response.data));

    // ✅ Display success toast if message exists
    if (response.data.message) {
      toast.success(response.data.message);
    }

    // ✅ Store token in localStorage if available
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
  } catch (error) {
    // ✅ Ensure the error message is a string (Avoid full Error object)
    const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";

    yield put(loginFailure(errorMessage)); // Only store the string message
    toast.error(errorMessage);
  }
}

// export default loginSaga;

// function* loginSaga(action) {
//   try {
//     // const response = yield call(api.post, "/auth/login", action.payload);
//     const response = yield call(axios.post, "http://localhost:3500/api/auth/login", action.payload);

//     yield put(loginSuccess(response));
//     toast.success(response.data.message);
//   } catch (error) {
//     // toast.error(error.response.data.message);
//     // const errorMessage =
//     //   error.response?.data?.message || "Login failed. Please try again.";

//     // yield put(loginFailure(errorMessage)); // Store only the message, not the whole object
//     // toast.error(errorMessage);
//     yield put(loginFailure(error.response ? error.response : error));
//   }
// }

function* fetchProfileSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(api.get, "/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    yield put(fetchProfileSuccess(response.data));
  } catch (error) {
    yield put(fetchProfileFailure(error.response.data));
  }
}

function* updateProfileSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      api.patch,
      "/auth/studentUpdate",
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(updateProfileSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    yield put(updateProfileFailure(error.response.data));
  }
}

export default function* studentSaga() {
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest("student/loginRequest", loginSaga);
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
