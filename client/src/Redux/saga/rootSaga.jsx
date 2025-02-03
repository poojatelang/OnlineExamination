import { all } from "redux-saga/effects";
import studentSaga from "./saga";
import quizSaga from "./quizsaga"; // Add your quiz-related sagas here
import adminSaga from "./adminSaga"



function* rootSaga() {
  yield all([
    studentSaga(),
    quizSaga(), 
    adminSaga()
    // Add more sagas here if needed
  ]);
}
export default rootSaga











// import { all } from "redux-saga/effects";
// import { watchFetchStudents } from "./adminSaga";

// export default function* rootSaga() {
//   yield all([watchFetchStudents()]);
// }
