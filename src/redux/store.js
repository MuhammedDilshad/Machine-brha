import { createStore } from "redux";
import itemsReducer from "./reducer";

const store = createStore(itemsReducer);

export default store;
