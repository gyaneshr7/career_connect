import React, { useState } from "react";
import "./ThreeDotDropdown.css"; // Assume this contains the necessary styles for the dropdown

function ThreeDotDropdown({ id, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    setIsOpen(false); // Close the dropdown after delete is triggered
    onDelete(id);
  };

  return (
    <div className="dropdown">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" id="dots-three-vertical" fill="white" onClick={toggleDropdown}><rect width="512" height="512" fill="none"></rect><circle cx="128" cy="64" r="16"></circle><circle cx="128" cy="128" r="16"></circle><circle cx="128" cy="192" r="16"></circle></svg>
      {isOpen && (
        <div className="menu">
          <div className="item" onClick={handleDelete}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeDotDropdown;
