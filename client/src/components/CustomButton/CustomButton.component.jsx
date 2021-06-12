import React from 'react';

const CustomButton = ({ children, ...otherProps}) => (
  <button className="custom-button"  {...otherProps}>{ children.toUpperCase() }</button>
)

export default CustomButton;