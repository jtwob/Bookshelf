import React from 'react';
import './Bookshelf.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  BOOK: 'book',
};

const Bookshelf = ({ children, moveBook }) => {
  // Divide books into rows (you can adjust the number of books per shelf)
  const booksPerRow = 3;
  const rows = [];

  for (let i = 0; i < children.length; i += booksPerRow) {
    rows.push(children.slice(i, i + booksPerRow));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bookshelf">
        {rows.map((row, rowIndex) => (
          <div className="shelf-row" key={rowIndex}>
            {row.map((book, bookIndex) => (
              <DraggableBook
                key={bookIndex}
                index={bookIndex}
                moveBook={moveBook} // Pass moveBook function to DraggableBook
                book={book}
              />
            ))}
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

// DraggableBook Component
const DraggableBook = ({ book, index, moveBook }) => {
  const [, ref] = useDrag({
    type: ItemType.BOOK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.BOOK,
    hover(item) {
      if (item.index !== index) {
        moveBook(item.index, index); // Call moveBook function from props
        item.index = index; // Update the index of the dragged item
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      {book} {/* Render your book component here */}
    </div>
  );
};

export default Bookshelf;