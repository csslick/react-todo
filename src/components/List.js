import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function List({ list, removeItem, editItem }) {
  return (
    <div className="list">
      {list.map((item) => {
        return (
          <div className="todo-item" key={item.id}>
            <p className="title">{item.title}</p>
            <div className="btn-container">
              <button 
                className="edit-btn"
                onClick={() => {
                  editItem(item.id)
                }}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  removeItem(item.id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
