import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";
import {
  setItems,
  addItem,
  deleteItem,
  updateItem,
  resetItem,
  sortAscending,
  sortDescending,
} from "../redux/action.js";
import axios from "axios";

function ListItems() {
  const dispatch = useDispatch();
  const axsData = useSelector((state) => state.items);
  const [newItem, setNewItemName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      const resData = res.data.products.slice(0, 10).map((data) => ({
        name: data.title,
        id: data.id,
      }));
      dispatch(setItems(resData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredItems(
      axsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, axsData]);

  const handleAddItem = () => {
    if (newItem) {
      const nextId =
        axsData.length > 0
          ? Math.max(...axsData.map((item) => parseInt(item.id) || 0)) + 1
          : 1;
      const newItemObj = {
        id: nextId.toString(),
        name: newItem,
      };
      dispatch(addItem(newItemObj));
      setNewItemName("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      dispatch(updateItem(id, editValue));
      setEditId(null);
      setEditValue("");
    }
  };
  const handleRedux = () => {
    dispatch(resetItem());
  };

  const handleAscendingSort = () => {
    dispatch(sortAscending());
  };
  const handleDescendingSort = () => {
    dispatch(sortDescending());
  };

  return (
    <div>
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItemName(e.target.value)}
          type="text"
          placeholder="Add new item"
        />
        <button onClick={handleAddItem}>Add</button>
        <button onClick={handleRedux}>REDUX</button>
        <button onClick={handleDescendingSort}>
          <TbSortDescendingNumbers />
        </button>
        <button onClick={handleAscendingSort}>
          <TbSortAscendingNumbers />
        </button>
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items"
          style={{ margin: "10px 0", padding: "5px", width: "200px" }}
        />
      </div>
      <div>
        <ul>
          {filteredItems.map((data) => (
            <div
              key={data.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              {editId === data.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ marginRight: "10px", padding: "5px" }}
                />
              ) : (
                <span>
                  {data.id}: {data.name}
                </span>
              )}
              <div>
                {editId === data.id ? (
                  <button onClick={() => handleSaveEdit(data.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data.id, data.name)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListItems;
