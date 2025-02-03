import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerRequest, registerSuccess, registerFailure,
  loginRequest, loginSuccess, loginFailure,
  fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure,
  updateProfileRequest, updateProfileSuccess, updateProfileFailure
} from "../slices/Student";
import { toast } from 'react-toastify'; 
import { push } from 'react-router-redux'; // For navigation (make sure to have it installed)
import api from "../../Utils/Api"; // API helper


 
    

function* registerSaga(action) {
    try {
      // Step 1: Register User
      const registerResponse = yield call(api.post, "/auth/register", action.payload);
      yield put(registerSuccess(registerResponse.data));
      toast.success(registerResponse.data.message )
      // Step 2: Automatically log in after successful registration
      const loginPayload = {
        email: action.payload.email,
        password: action.payload.password, // Password is needed for login
      };
      const loginResponse = yield call(api.post, "/auth/login", loginPayload);
   
      // Step 3: Save token and user info from login response
      yield put(loginSuccess(loginResponse.data));
      localStorage.setItem("token", loginResponse.data.token);
      toast.success(loginResponse.data.message )
  
    } catch (error) {
      yield put(registerFailure(error.response?.data || "Registration failed"));
      toast.error(error.response.data.message);
    }
  }
  

function* loginSaga(action) {
  try {
    const response = yield call(api.post, "/auth/login", action.payload);

    yield put(loginSuccess(response.data));
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.response.data.message);
    yield put(loginFailure(error.response ? error.response : error));
    // if (error.response && error.response.status === 401) {
    //     // Redirect to the register page
        
  
    //     // Show unauthorized notification
    //     toast.error(error.response.data.message);
    //     // window.location.href = '/register';
    //     // yield put(push('/register')); 
    //   } 
        // Handle other errors
       
      
    }
}

function* fetchProfileSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(api.get, "/auth/profile", {
      headers: { Authorization: `Bearer ${token}` ,"Content-Type": "application/json"}
    });
    yield put(fetchProfileSuccess(response.data));
  } catch (error) {
    yield put(fetchProfileFailure(error.response.data));
  }
}

function* updateProfileSaga(action) {
  try {
    console.log(action.payload)
    const token = localStorage.getItem("token");
    const response = yield call(api.patch, "/auth/studentUpdate", action.payload, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });
   
    yield put(updateProfileSuccess(response.data));
    console.log(response)
    toast.success(response.data.message);
  } catch (error) {
    yield put(updateProfileFailure(error.response.data));
  }
}

export default function* studentSaga() {
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
