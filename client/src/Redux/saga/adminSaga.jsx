import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  deletestudentSuccess,
  delatestudentFailure,
  deleteStudentsStart,
  fetchQuestionsStart,
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
} from "../slices/Admin";
import api from "../../Utils/Api"; // API helper
import { toast } from "react-toastify";

function* fetchStudentsSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(api.get, "/admin/student", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    yield put(fetchStudentsSuccess(response.data.students));
    toast.success(response.data.message);
  } catch (error) {
    yield put(fetchStudentsFailure(error.message));
  }
}

function* deleteStudent(action) {
  console.log(action);
  try {
    const token = localStorage.getItem("token");
    let response = yield call(api.delete, `/admin/student/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    yield put(deletestudentSuccess(action.payload));
    toast.success(response.data.message);
  } catch (error) {
    yield put(delatestudentFailure(error.message));
  }
}

function* fetchQuestions() {
  try {
    const response = yield call(api.get, "/quiz/questions");
    yield put(fetchQuestionsSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    yield put(fetchQuestionsFailure(error.message));
  }
}

function* addQuestion(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(api.post, "/admin/questions", action.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    yield put(addQuestionSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    yield put(addQuestionFailure(error.message));
  }
}

function* updateQuestion(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      api.put,
      `/admin/questions/${action.payload.id}`,
      action.payload.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(updateQuestionSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    yield put(updateQuestionFailure(error.message));
  }
}

function* deleteQuestion(action) {
  try {
    const token = localStorage.getItem("token");
    yield call(api.delete, `/admin/questions/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    yield put(deleteQuestionSuccess(action.payload));
    toast.success(response.data.message);
  } catch (error) {
    yield put(deleteQuestionFailure(error.message));
  }
}

function* fetchQuestionDetails(action) {
  console.log(action);
  try {
    const token = localStorage.getItem("token");
    const response = yield call(api.get, `/admin/questions/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    yield put(fetchQuestionDetailsSuccess(response.data));
  } catch (error) {
    yield put(fetchQuestionDetailsFailure(error.message));
  }
}

// Watcher Saga
export default function* adminSaga() {
  yield takeLatest("admin/fetchStudentsStart", fetchStudentsSaga);
  yield takeLatest("admin/deleteStudentsStart", deleteStudent);

  yield takeLatest("admin/fetchQuestionsStart", fetchQuestions);
  yield takeLatest("admin/addQuestionStart", addQuestion);
  yield takeLatest("admin/updateQuestionStart", updateQuestion);
  yield takeLatest("admin/deleteQuestionStart", deleteQuestion);
  yield takeLatest("admin/fetchQuestionDetailsStart", fetchQuestionDetails);
}
