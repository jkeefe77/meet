import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";


describe("<EventList /> component", () => {
  const setup = (events = []) => {
    render(<EventList events={events} />);
  };

  test('has an element with "list" role', () => {
    setup();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    setup(allEvents);
    expect(screen.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});
