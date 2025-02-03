import { all } from "redux-saga/effects";
import studentSaga from "./saga";
import quizSaga from "./quizsaga"; 
import adminSaga from "./adminSaga"



function* rootSaga() {
  yield all([
    studentSaga(),
    quizSaga(), 
    adminSaga()
  ]);
}
export default rootSaga








