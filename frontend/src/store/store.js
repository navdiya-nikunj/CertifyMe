import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import studentReducer from "../state/studentSlice";
import instituteReducer from "../state/instituteSlice";

const rootReducer = combineReducers({
  student: studentReducer,
  institute: instituteReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable properties
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
