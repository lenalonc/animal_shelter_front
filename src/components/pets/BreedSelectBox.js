import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import api from "../../api/Api";

const BreedSelectBox = ({
  onChange,
  options,
  setOptions,
  label,
  width,
  disabled,
  selectedAnimalType,
}) => {
  const [optionsReformated, setOptionsReformated] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const formatOptions = () => {
      if (!disabled && selectedAnimalType) {
        setSelectedOption(null);
        fetchBreeds(selectedAnimalType);
      } else {
        setOptionsReformated([]);
        setSelectedOption(null);
        onChange(null);
      }
    };

    formatOptions();
  }, [disabled, selectedAnimalType]);

  const fetchBreeds = async (animalType) => {
    try {
      const response = await api.get(`/pet/breeds/${animalType}`);
      setOptions(response.data);
      const formattedBreeds = response.data.map((breed) => ({
        value: breed.id,
        label: breed[label],
      }));
      setOptionsReformated(formattedBreeds);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const handleChange = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      onChange(
        newValue ? options.find((option) => option.id === newValue.value) : null
      );
      setSelectedOption(newValue);
    } else if (actionMeta.action === "clear") {
      onChange(null);
      setSelectedOption(null);
    }
  };

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
      width: width,
    }),
  };

  return (
    <CreatableSelect
      isClearable
      options={optionsReformated}
      onChange={handleChange}
      styles={customStyles}
      isValidNewOption={() => false}
      value={selectedOption}
      isDisabled={disabled || !selectedAnimalType}
    />
  );
};

export default BreedSelectBox;
