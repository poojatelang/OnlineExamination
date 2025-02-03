import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} from "../slices/Quiz";
import api from "../../Utils/Api"; // API helper



function* fetchQuestionsSaga() {
  try {
    const response = yield call(api.get, "/quiz/questions");
    yield put(fetchQuestionsSuccess(response.data));
  } catch (error) {
    yield put(fetchQuestionsFailure(error.message));
  }
}

export default function* quizSaga() {
  yield takeLatest("quiz/fetchQuestionsRequest", fetchQuestionsSaga);
}
