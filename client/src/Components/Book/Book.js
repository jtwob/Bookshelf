import React, { useState } from 'react';
import './Book.css';

const Book = ({ title, color, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainText, setMainText] = useState('Main Text'); // Default text
  const [supplementalText, setSupplementalText] = useState('Supplemental Text'); // Default text

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete(); // Call the delete function passed from the parent
  };

  return (
    <div className={`book-container ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <div
        className={`spine ${isOpen ? 'hidden' : ''}`}
        style={{ backgroundColor: color }} // Set spine color from props
      >
        <div className="spine-title">{title}</div>
      </div>
      <div
        className={`cover ${isOpen ? 'hidden' : ''}`}
        style={{ backgroundColor: color }} // Set cover color from props
      ></div>
      <div className="pages">
        <div className={`left-page ${isOpen ? 'open' : ''}`}>
          <div
            className="page-content main-text"
            contentEditable={isOpen} // Make editable only when the book is open
            suppressContentEditableWarning={true} // Suppress warnings for using contentEditable
            onInput={(e) => setMainText(e.target.innerText)} // Update state on input
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the book
          >
            {mainText}
          </div>
        </div>
        <div className={`right-page ${isOpen ? 'open' : ''}`}>
          <div
            className="page-content supplemental-text"
            contentEditable={isOpen} // Make editable only when the book is open
            suppressContentEditableWarning={true} // Suppress warnings for using contentEditable
            onInput={(e) => setSupplementalText(e.target.innerText)} // Update state on input
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the book
          >
            {supplementalText}
          </div>
        </div>
      </div>
      {isOpen && ( // Show delete button when the book is open
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Book;