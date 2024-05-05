import React, { useState, useEffect, useRef } from "react";
import arrowDown from "../../img/arrow-down-svgrepo-com.svg";

const SelectionBox = ({ options, onChange, label, attribute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const headerWidth = attribute === "breed" ? { width: "300px" } : {};
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option[attribute].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select-pet-add" style={headerWidth} ref={selectRef}>
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
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.map((option) => (
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
