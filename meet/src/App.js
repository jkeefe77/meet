import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberofEvents from "./components/NumberofEvents";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberofEvents />
    </div>
  );
};

export default App;
