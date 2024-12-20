import {
  SET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  RESET_ITEM,
  SORT_ASCENDING,
  SORT_DESCENDING,
} from "./action.js";

const initialState = {
  items: [],
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items] };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        ),
      };
    case RESET_ITEM:
      return initialState;
    case SORT_ASCENDING:
      return {
        ...state,
        items: [...state.items].sort((a, b) => a.id - b.id),
      };

    case SORT_DESCENDING:
      return {
        ...state,
        items: [...state.items].sort((a, b) => b.id - a.id),
      };

    default:
      return state;
  }
};

export default itemsReducer;
