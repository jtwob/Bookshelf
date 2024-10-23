import React, { useState, useRef } from 'react';
import './Book.css';

const Book = ({ title, color, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainText, setMainText] = useState('Main Text'); // Default text
  const [supplementalText, setSupplementalText] = useState('Supplemental Text'); // Default text

  // Create refs for the editable content
  const mainTextRef = useRef(null);
  const supplementalTextRef = useRef(null);

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
            onBlur={() => setMainText(mainTextRef.current.innerText)} // Update state when losing focus
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the book
            ref={mainTextRef} // Attach ref to the div
          >
            {mainText}
          </div>
        </div>
        <div className={`right-page ${isOpen ? 'open' : ''}`}>
          <div
            className="page-content supplemental-text"
            contentEditable={isOpen} // Make editable only when the book is open
            suppressContentEditableWarning={true} // Suppress warnings for using contentEditable
            onBlur={() => setSupplementalText(supplementalTextRef.current.innerText)} // Update state when losing focus
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the book
            ref={supplementalTextRef} // Attach ref to the div
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
