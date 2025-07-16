import React, { useState, useEffect } from "react";
import "./Input.css";
import Tooltip from "../Tooltip/Tooltip";

interface Props {
  // Required content & value
  label: string;
  value: string;
  onValidityChange: (isValid: boolean) => void;

  // Input type & validation
  format: "text" | "phone" | "pin" | "number";
  type?: string;
  required?: boolean;
  pattern?: string;
  errorMsg?: string;

  // Events
  onChange?: (value: string) => void;

  // UI
  tooltipContent: string;
  submitted?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  value,
  onValidityChange,

  format,
  type = "text",
  required = false,
  pattern,
  errorMsg,

  onChange,

  tooltipContent,
  submitted,
}) => {
  const [touched, setTouched] = useState(false);
  const [val, setVal] = useState(value);
  const [isValid, setIsValid] = useState(false);

  // Validate value against pattern (if given)
  useEffect(() => {
    setIsValid(!pattern || new RegExp(pattern).test(value));
  }, [value, pattern]);

  // Notify parent about validity changes
  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // Format phone number like (123) 456-7890
  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, "").slice(0, 10);
    const len = digits.length;

    if (len === 0) return "";

    if (len < 4) return digits;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  // Format 16-digit PIN as XXXX-XXXX-XXXX-XXXX
  const formatPin = (input: string): string => {
    return (
      input
        .replace(/\D/g, "")
        .slice(0, 16)
        .match(/.{1,4}/g)
        ?.join("-") || ""
    );
  };

  // Handle input changes with formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    switch (format) {
      case "phone":
        newValue = formatPhoneNumber(newValue);
        break;
      case "pin":
        newValue = formatPin(newValue);
        break;
      case "text":
        newValue = newValue.replace(/[^a-zA-Z]/g, "");
        break;
      case "number":
        newValue = newValue.replace(/[^0-9.]/g, "");
        break;
    }

    setVal(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="text-input-container">
      <label>
        {label} {required && "*"}
      </label>
      <input
        className="text-input"
        type={type}
        value={val}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        required={required}
        pattern={pattern}
        aria-invalid={!isValid}
        aria-describedby={errorMsg ? `${label}-error` : undefined}
      />
      {!isValid && (touched || submitted) && (
        <span id={`${label}-error`} role="alert">
          {errorMsg}
        </span>
      )}
      <Tooltip content={tooltipContent}>
        <img src="images/info.svg" alt="Info icon" className="icon" />
      </Tooltip>
    </div>
  );
};

export default Input;
