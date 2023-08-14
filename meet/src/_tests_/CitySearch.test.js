import { extractLocations, getEvents } from "../api";
import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";

describe("<CitySearch /> component", () => {
  test("renders text input", () => {
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.getByRole("textbox"); // Change to getByRole
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch allLocations={[]} />);
    const suggestionList = screen.getByRole("list"); // Change to queryByRole
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    render(<CitySearch allLocations={[]} setCurrentCity={() => {}} />);
    const cityTextBox = screen.getByRole("textbox"); // Change to getByRole
    await userEvent.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion = screen.getAllByRole("listitem")[0];
    await userEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems =
      within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
