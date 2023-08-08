import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  const setup = () => {
    render(<App />);
  };

  test("renders list of events", () => {
    setup();
    expect(screen.getByPlaceholderText("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    setup();
    expect(screen.getByPlaceholderText("#city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    expect(
      screen.getByPlaceholderText("#number-of-events")
    ).toBeInTheDocument();
  });
});
