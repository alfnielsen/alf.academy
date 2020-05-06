import { applyMiddleware, combineReducers, createStore, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

import createSagaMiddleware from "redux-saga"
import { IFunctionState, rootSaga, rootReducer } from "../redux-area/functions.redux"

export interface IStoreState extends IFunctionState { }

// Combined different areas into the store root reducer
const sagaMiddleware = createSagaMiddleware()

// Normal redux store setup
const configureStore = () => {
   const middleware = [sagaMiddleware]
   const newStore = createStore(
      rootReducer,
      composeWithDevTools(
         applyMiddleware(sagaMiddleware)
      )
   )
   sagaMiddleware.run(rootSaga)
   return newStore
}

export default configureStore
