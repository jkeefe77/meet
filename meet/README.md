# Meet

- Meet is an app for users to find what kind of events are happening, where they are happening, and get information about the event.

# How to get the project running

- https://jkeefe77.github.io/meet/

# Created with

- React
- CSS
- JavaScript

- also uses the Google Calendar API and OAuth2 authentication flow.

# Features

FEATURE 1: FILTER EVENTS BY CITY

As a user
I should be able to filter events by city
So I can see events happening in that city

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

---

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

As a user
I should be able to show and hide an event's details
So that I can see details from only the events that interest me

Scenario 1: An event element is collapsed by default
Given an event is being displayed
When the user first sees the event
Then the details will not be displayed

Scenario 2: User can expand an event to see its details
Given an event is being displayed
When the user clicks on the event
Then the event will expand to show more details

Scenario 3: User can collapse an event to hide its details
Given the details are currently shown for an event
When the user clicks on the "collapse" button
Then the details will no longer be displayed

---

FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user
I should be able to specify the number of events to be shown on a page
So that I can view the amount of events I prefer at one time

Scenario 1: When user hasn’t specified a number, 32 is the default number
Given a user has not specified a number of events
When the user opens the app or selects a city
Then a maximum of 32 events will be displayed

Scenario 2: User can change the number of events they want to see
Given a user specifies the number of events they want to view
When the user opens the app or selects a city
Then a maximum of the number of events they selected will be displayed

---

FEATURE 4: USE THE APP WHEN OFFLINE

As a user
I should be able to use the app offline
So that I do not need an internet connection to use the app

Scenario 1: Show cached data when there’s no internet connection
Given the user has used the app with an internet connection
When the user opens the app without an internet connection
Then cached data from their last session will be displayed

Scenario 2: Show error when user changes the settings (city, time range)
Given the app does not have an internet connection
When the user tries to change the settings of the search
Then they will recieve an error informing them an internet connection is required

---

FEATURE 5: DATA VISUALIZATION

As a user
I should be able to view a chart with event data
So that I can quickly and easily see information about events in an area

Scenario 1: Show a chart with the number of upcoming events in each city
Given there are events listed for a city
When the user selects that city
Then they will see a chart displaying data about the events happening in that city
