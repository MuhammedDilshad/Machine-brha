export const SET_ITEMS = "SET_ITEMS";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const RESET_ITEM = "RESET_ITEM";
export const SORT_ASCENDING = "SORT_ASCENDING";
export const SORT_DESCENDING = "SORT_DESCENDING";

export const sortDescending = () => ({
  type: SORT_DESCENDING,
});

export const sortAscending = () => ({
  type: SORT_ASCENDING,
});

export const resetItem = () => ({
  type: RESET_ITEM,
});

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const updateItem = (id, name) => ({
  type: UPDATE_ITEM,
  payload: { id, name },
});
