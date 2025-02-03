import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import studentReducer from "./slices/Student";
import quizReducer from "./slices/Quiz";
import adminReducer from "./slices/Admin";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    student: studentReducer,
    quiz: quizReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
      thunk: false,
      serializableCheck: {
        ignoredPaths: ['admin.error.headers'], 
      },
     }).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);

export default store;
