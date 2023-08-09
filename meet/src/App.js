import EventList from './components/EventList';
import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import { extractLocations, getEvents } from "./api";
import NumberOfEvents from "./components/NumberOfEvents";


const App = () => {
  const [selectedCity, setSelectedCity] = useState("See all cities");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [eventNumber, setEventNumber] = useState(32);
  const [events] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const handleCitySelected = (city, numberOfEvents) => {
    setSelectedCity(city);
    const filteredEvents = events.filter((event) => event.location === city);
    let sliced = [];
    if (city === "See all cities") {
      sliced = events.slice(0, numberOfEvents);
    } else {
      //use eventNumber if present to limit number
      sliced = filteredEvents.slice(0, numberOfEvents);
    }
    setFilteredEvents(sliced);
  };


function onEventNumberChange(number) {
  console.log("onEventNumberChange:", number);
  setEventNumber(number);
  handleCitySelected(selectedCity, number);
}
  return (
    <div className="App">
      <NumberOfEvents ></NumberOfEvents>
      <CitySearch />
      <NumberOfEvents
      onEventNumberChange={onEventNumberChange}/>
      <EventList events={filteredEvents.length > 0 ? filteredEvents : events} />   
      </div>
  );
 };

export default App;