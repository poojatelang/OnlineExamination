// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import studentReducer from "./slices/Student";
// import studentSaga from "./saga/saga"

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: {
//     student: studentReducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
// });

// sagaMiddleware.run(studentSaga);

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import studentReducer from "./slices/Student";
import quizReducer from "./slices/Quiz";  // Add the quiz slice
import adminReducer from "./slices/Admin"
import rootSaga from "./saga/rootSaga"; // Import the combined saga


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    student: studentReducer,
    quiz: quizReducer, // Add quiz reducer here
    admin:adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk as we use saga
});

sagaMiddleware.run(rootSaga);

export default store;
