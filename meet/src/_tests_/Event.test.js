import { render, screen } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";
import userEvent from "@testing-library/user-event";

const mockEvent = mockData[0];

describe("<Event /> component", () => {
  const setup = (event = []) => {
    render(<Event event={event} />);
  };

  test("has the events title", () => {
    setup();
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test("has the events time", () => {
    setup();
    const time = screen.queryByText(mockEvent.created);
    expect(time).toBeInTheDocument();
  });

  test("has the events location", () => {
    const location = screen.queryByText(mockEvent.location);
    expect(location).toBeInTheDocument();
  });

  test('has the button "show details"', () => {
    const button = screen.queryByText("Show Details");
    expect(button).toBeInTheDocument();
  });

  test("by default event details are hidden", () => {
    const eventDetails = screen.queryByText("description");
    expect(eventDetails).not.toBeInTheDocument();
  });

  test('show details after user clicks button "show details"', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("Show Details");
    await user.click(button);

    const eventDOM = screen.container.firstChild;
    const button = eventDOM.querySelector(".details");
    expect(button).toHaveTextContent();
  });

  test('hide details after user clicks button "hide details"', async () => {
    const button = screen.queryByText("Show Details");
    const eventDOM = screen.container.firstChild;
    await userEvent.click(button);

    const hideButton = screen.queryByText("Hide Details");
    await userEvent.click(hideButton);

    const details = eventDOM.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  });
});
