import React, { useState } from "react";

const NumberOfEvents = ({
  numberOfEvents,
  onInputChange,
  setCurrentNOE,
  setErrorAlert,
}) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (isNaN(value)) {
      setErrorAlert("value is not a number");
    } else if (value > 50) {
      setErrorAlert("maximum value is 50");
    } else if (value <= 0) {
      setErrorAlert("minimum value is 1");
    } else {
      setErrorAlert("");
      setCurrentNOE(value);
    }

    setInputValue(value);
    onInputChange(event); // Notify the parent component about the change
  };

  return (
    <div>
      <label htmlFor="numberOfEvents">Number of Events:</label>
      <input
        id="numberOfEvents"
        data-testid="number-of-events-component"
        type="number"
        min="1"
        max="100"
        value={inputValue}
        onChange={handleInputChange}
        role="spinbutton" // Add the "role" attribute here
      />
      <p>Showing {inputValue} events</p>
    </div>
  );
};

export default NumberOfEvents;
