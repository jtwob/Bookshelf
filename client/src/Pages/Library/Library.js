import React, { useState } from 'react';
import Bookshelf from '../../Components/Bookshelf/Bookshelf'; // Adjust the path as necessary
import Book from '../../Components/Book/Book'; // Adjust the path as necessary

const Library = () => {
  const [books, setBooks] = useState([]);

  const addBook = (title, color) => {
    const newBook = (
      <Book
        key={books.length}
        title={title}
        color={color}
        onDelete={() => deleteBook(books.length)} // Pass the delete function
      />
    );
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };
  
  const deleteBook = (index) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  const handleAddBookClick = () => {
    const title = prompt("Enter the book title:");
    const color = prompt("Enter the book cover color (e.g., #444):");
    if (title && color) {
      addBook(title, color);
    }
  };

  // Move book function
  const moveBook = (dragIndex, hoverIndex) => {
    const draggedBook = books[dragIndex];
    const newBooks = [...books];
    newBooks.splice(dragIndex, 1);
    newBooks.splice(hoverIndex, 0, draggedBook);
    setBooks(newBooks);
  };

  return (
    <div>
      <h1>Library</h1>
      <button onClick={handleAddBookClick}>Add Book</button>
      <Bookshelf children={books} moveBook={moveBook} /> {/* Pass moveBook here */}
    </div>
  );
};

export default Library;