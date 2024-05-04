import React, { useEffect, useState } from "react";
import arrowDown from "../../img/arrow-down-svgrepo-com.svg";

const SelectionBox = ({ options, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
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
              key={option}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionBox;
