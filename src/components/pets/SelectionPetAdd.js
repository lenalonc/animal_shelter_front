// SelectionBox.jsx
import React, { useState } from "react";
import arrowDown from "../../img/arrow-down-svgrepo-com.svg";

const SelectionBox = ({ options, onChange, label, attribute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-pet-add">
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption ? selectedOption[attribute] : label}</span>
        <img
          src={arrowDown}
          className={`arrow-icon ${isOpen ? "open" : ""}`}
          alt="Dropdown arrow"
          style={{ width: 20 }}
        />
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.id}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option[attribute]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionBox;
