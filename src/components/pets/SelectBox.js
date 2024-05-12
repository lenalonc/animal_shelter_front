import CreatableSelect from "react-select/creatable";

const SelectBox = ({
  onChange,
  options,
  label,
  width,
  preselectedOption,
  placeholder,
  onClear,
}) => {
  const optionsReformated = options.map((op) => ({
    value: op.id,
    label: op[label],
  }));

  const handleChange = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      onChange(
        newValue ? options.find((option) => option.id === newValue.value) : null
      );
    } else {
      if (onClear) onClear();
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
    menu: (provided) => ({
      ...provided,
      width: width,
    }),
  };

  return (
    <CreatableSelect
      isClearable
      placeholder={placeholder}
      options={optionsReformated}
      onChange={handleChange}
      styles={customStyles}
      isValidNewOption={() => false}
      defaultValue={
        preselectedOption
          ? { value: preselectedOption.id, label: preselectedOption[label] }
          : null
      }
    />
  );
};

export default SelectBox;
