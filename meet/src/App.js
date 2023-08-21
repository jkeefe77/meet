import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, WarningAlert, ErrorAlert } from "./components/Alert";

const App = () => {
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    if (navigator.onLine) {
      // set the warning alert message to an empty string ""
    } else {
      // set the warning alert message to a non-empty string
    }
    fetchData();
  }, [currentCity, currentNOE, fetchData]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setCurrentNOE(value);
  };
  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert}
        setErrorAlert={setErrorAlert}
      />
      <EventList
        events={events}
        numberOfEvents={currentNOE}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert}
        setErrorAlert={setErrorAlert}
      />
      <NumberOfEvents
        id="number-of-events-component"
        numberOfEvents={currentNOE}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default App;
