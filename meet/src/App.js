import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberofEvents";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";
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
      // Online: set the warning alert message to an empty string ""
      setWarningAlert("");
    } else {
      // Offline: set the warning alert message to a non-empty string
      setWarningAlert(
        "You are currently offline. Connect to the internet to see new events"
      );
    }
    fetchData();
  }, [currentCity, currentNOE, fetchData]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setCurrentNOE(value);
  };
  return (
    <div className="App">
      <h1>Meet App</h1>
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
      <div className="charts-container">
      <EventGenresChart events={events}/>
      <CityEventsChart allLocations={allLocations} events={events} />
      
      <EventList
        events={events}
        numberOfEvents={currentNOE}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert}
        setErrorAlert={setErrorAlert}
      />
      </div>
      <NumberOfEvents
        id="number-of-events-component"
        numberOfEvents={currentNOE}
        onInputChange={handleInputChange}/>
    </div>
  );
};

export default App;
