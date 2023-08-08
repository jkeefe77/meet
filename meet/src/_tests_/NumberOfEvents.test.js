import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberofEvents.js";

describe("<NumberOfEvents /> Component", () => {
  const setup = () => {
    render(
      <NumberOfEvents eventNumber={1} onEventNumberChange={(number) => {}} />
    );
  };

  test("has the input textbox", () => {
    setup();
    const input = screen.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("default number of events is 32", () => {
    setup();
    const input = screen.queryByRole("textbox");
    expect(input).toHaveValue("32");
  });

  test("updates number of events when user types", async () => {
    setup();
    const input = screen.queryByRole("textbox");
    await userEvent.type(input, "{backspace}{backspace}10");
    expect(input).toHaveValue("10");
  });
});
