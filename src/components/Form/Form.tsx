import React, { useState } from "react";
import Input from "../Input/Input";
import "./Form.css";

const Form: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    cost: "",
    pin: "",
  });

  const [validity, setValidity] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    cost: false,
    pin: false,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidityChange = (
    field: keyof typeof validity,
    isValid: boolean
  ) => {
    setValidity((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const allValid = Object.values(validity).every(Boolean);
    if (!allValid) return;

    console.log("Form Submitted!", formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="input-container">
        <Input
          label="First Name"
          format="text"
          tooltipContent="Example: Squidward"
          required
          pattern="^[A-Za-z]{2,}$"
          errorMsg="Enter 2+ letters."
          value={formData.firstName}
          onChange={(val) => handleChange("firstName", val)}
          onValidityChange={(valid) => handleValidityChange("firstName", valid)}
          submitted={submitted}
        />
        <Input
          label="Last Name"
          format="text"
          tooltipContent="Example: Tennis Balls"
          required
          pattern="^[A-Za-z]{2,}$"
          errorMsg="Enter 2+ letters."
          value={formData.lastName}
          onChange={(val) => handleChange("lastName", val)}
          onValidityChange={(valid) => handleValidityChange("lastName", valid)}
          submitted={submitted}
        />
        <Input
          label="Phone Number"
          format="phone"
          tooltipContent="I lost the game"
          required
          pattern="^\(\d{3}\) \d{3}-\d{4}$"
          errorMsg="Use format (123) 456-7890."
          value={formData.phone}
          onChange={(val) => handleChange("phone", val)}
          onValidityChange={(valid) => handleValidityChange("phone", valid)}
          submitted={submitted}
        />
        <Input
          label="Email"
          format="text"
          type="email"
          tooltipContent="Vote for Pedro…with a valid email"
          required
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          errorMsg="Enter a valid email."
          value={formData.email}
          onChange={(val) => handleChange("email", val)}
          onValidityChange={(valid) => handleValidityChange("email", valid)}
          submitted={submitted}
        />
        <Input
          label="Guess the Air Fryer's Cost"
          format="number"
          type="text"
          tooltipContent="The AI told me this can't be any cheaper than $27.99"
          required
          pattern="^\d+(\.\d{1,2})?$"
          errorMsg="Enter a valid price."
          value={formData.cost}
          onChange={(val) => handleChange("cost", val)}
          onValidityChange={(valid) => handleValidityChange("cost", valid)}
          submitted={submitted}
        />
        <Input
          label="16 Digit Pin"
          format="pin"
          tooltipContent="Absolutely, under no circumstances, ever, give this away to anyone"
          required
          pattern="^\d{4}-\d{4}-\d{4}-\d{4}$"
          errorMsg="Must be 16 digits."
          value={formData.pin}
          onChange={(val) => handleChange("pin", val)}
          onValidityChange={(valid) => handleValidityChange("pin", valid)}
          submitted={submitted}
        />
      </div>
      <button className="btn btn-line" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
