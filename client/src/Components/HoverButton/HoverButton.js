import React from 'react';
import './styles.css'; // Import the CSS file

const HoverButton = (props) => {
  return <button className="button">{props.text}</button>;
};

export default HoverButton;