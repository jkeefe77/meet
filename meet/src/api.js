import mockData from "./mock-data";

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 *
 * This function will fetch the list of all events
 */

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking token:", error);
    throw error;
  }
};
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      "https://yr2jwknznh.execute-api.us-east-1.amazonaws.com/dev/api/token" +
        "/" +
        encodeCode
    );

    const { access_token } = await response.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      return access_token;
    } else {
      throw new Error("Access token not received");
    }
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");
      if (!code) {
        const response = await fetch(
          "https://yr2jwknznh.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
        );
        const result = await response.json();
        const { authUrl } = result;
        window.location.href = authUrl;
      } else {
        return await getToken(code);
      }
    }
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
};

export const getEvents = async () => {
  try {
    if (window.location.href.startsWith("http://localhost")) {
      return mockData;
    }
    if (!navigator.onLine) {
      const data = localStorage.getItem("lastEvents");

      return data ? JSON.parse(data).events : [];
    }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url =
        "https://yr2jwknznh.execute-api.us-east-1.amazonaws.com/dev/api/get-events" +
        "/" +
        token;
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        localStorage.setItem("lastEvents", JSON.stringify(result.events));
        return result.events;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};
