import React, { useState, useEffect, useRef } from "react";
import OutsideClick from "../../utils/OutsideClick";
import dropDownIcon from "./dropdown-icon.png";
import searchIcon from "./search-icon.png";
import Scrollbar from "smooth-scrollbar";
import '../../assets/scss/app.scss';

export interface SelectDropdownProps {
  options: Array<Record<string, any>>;
  onSelect: (value: any) => void;
  searchable?: boolean;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
}

const SelectDropdown = ({
  disabled,
  options,
  onSelect,
  searchable = true,
  value,
  placeholder = "Select option",
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen);

  const handleSelect = (option: any) => {
    if (!disabled) {
      onSelect(option);
      setSelectedOption(option);
      setIsOpen(false);
      setSearch("");
      setFilteredOptions(options);
    }
  };

  useEffect(() => {
    OutsideClick({ wrapperRef, setIsOpen });
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (value) {
      const selected = options.find((item) => item.value === value);
      setSelectedOption(selected || null);
    }
  }, [value, options]);

  useEffect(() => {
    if (scrollbarRef.current) {
      const scrollbar = Scrollbar.init(scrollbarRef.current);
      return () => scrollbar.destroy();
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredOptions(
      options.filter((item) => item.label.toLowerCase().includes(query))
    );
  };

  return (
    <div ref={wrapperRef}>
      <button type="button" onClick={toggleDropdown} disabled={disabled}>
        <span>{selectedOption?.label || placeholder}</span>
        <img
          src={dropDownIcon}
          alt="Dropdown"
          style={{ width: "20px", height: "20px" }}
        />
      </button>

      {isOpen && (
        <div>
          {searchable && (
            <div>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                disabled={disabled}
              />
              <img
                src={searchIcon}
                alt="Search"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          )}
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleSelect(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
