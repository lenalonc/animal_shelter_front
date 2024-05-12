import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const SelectMultiple = ({ onChange, preselectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#8a251d"
        : state.isFocused
        ? "#fff"
        : "#fff",
      color: state.isSelected ? "#fff" : state.isFocused ? "black" : "#000",
      ":hover": {
        backgroundColor: state.isSelected
          ? "#8a251d"
          : state.isFocused
          ? "#9d6964"
          : "#f0f0f0",
        color: "#fff",
      },
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : "rgb(204, 204, 204)",
      boxShadow: state.isFocused ? "0 0 0 0.85px black" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "black" : "rgb(204, 204, 204)",
        boxShadow: state.isFocused ? "0 0 0 0.85px black" : provided.boxShadow,
      },
      width: "300px",
    }),

    menu: (provided) => ({
      ...provided,
      width: "300px",
    }),
  };

  const basicColors = [
    { value: "orange", label: "Orange" },
    { value: "brown", label: "Brown" },
    { value: "grey", label: "Grey" },
    { value: "yellow", label: "Yellow" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  useEffect(() => {
    if (preselectedOptions) {
      const parsedOptions = preselectedOptions.split(" ").map((color) => ({
        value: color,
        label: color.charAt(0).toUpperCase() + color.slice(1),
      }));
      setSelectedOptions(parsedOptions);
    }
  }, [preselectedOptions]);

  const handleChange = (newValue) => {
    setSelectedOptions(newValue || []);
    onChange(newValue || []);
  };

  return (
    <CreatableSelect
      isMulti
      options={basicColors}
      styles={customStyles}
      isValidNewOption={() => false}
      onChange={handleChange}
      value={selectedOptions}
    />
  );
};

export default SelectMultiple;
