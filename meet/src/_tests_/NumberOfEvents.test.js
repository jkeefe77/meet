import React from "react";
import user from "@testing-library/user-event";
import NumberOfEvents from "./components/NumberOfEvents";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
  test('should contain an input element with type "number"', () => {
    render(<NumberOfEvents numberOfEvents={32} onInputChange={() => {}} />);
    const inputElement = screen.getByTestId("number-of-events-component");
    expect(inputElement).toBeInTheDocument();
  });

  test("should have a default value of 32 for the input field", () => {
    render(<NumberOfEvents numberOfEvents={32} onInputChange={() => {}} />);
    const inputElement = screen.getByTestId("number-of-events-component");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("32");
  });

  test("textbox value changes when user interacts with it", async () => {
    // Add the async keyword
    render(<NumberOfEvents numberOfEvents={32} onInputChange={() => {}} />);
    const textboxElement = screen.getByTestId("number-of-events-component");
    expect(textboxElement.value).toBe("32"); // Check the initial value
    await user.type(textboxElement, "{backspace}{backspace}10");
    expect(textboxElement.value).toBe("10"); // Check that the value is updated to '10'
  });
});

describe("<NumberOfEvents /> integration", () => {
  test("should change the number of events displayed when user updates the input field", async () => {
    // Render the App component
    render(<App />);

    // Find the input field for the number of events
    const numberOfEventsInput = screen.getByTestId(
      "number-of-events-component"
    );

    // Check the initial value of the input field (default value should be "32")
    expect(numberOfEventsInput.value).toBe("32");

    // Change the value of the input field to "10"
    await user.type(numberOfEventsInput, "{backspace}{backspace}10");

    // Get the updated event list
    const eventItems = screen.getAllByTestId("event-item");

    // Expect the number of events displayed to be 10
    expect(eventItems.length).toBe(10);
  });
});
