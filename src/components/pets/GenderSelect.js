import CreatableSelect from "react-select/creatable";

const GenderSelect = ({ onChange, options }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleChange = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      onChange(newValue);
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
      width: "200px",
    }),
  };

  return (
    <CreatableSelect
      isClearable
      options={genderOptions}
      onChange={handleChange}
      styles={customStyles}
      isValidNewOption={() => false}
      // onFocus={onFocus}
      // onBlur={onBlur}
    />
  );
};

export default GenderSelect;
