import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
