import {aviation_url} from './url';

const lat = 22.639416535722226;
const long = 88.34107229852647;
const radius_airport = 50000;

const apiUrl = 'https://overpass-api.de/api/interpreter';
export const airportCheck = async () => {
  // Overpass query to get information about airports
  const overpassQuery = `
[out:json];
(
  node["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
  way["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
  relation["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
);
out center;
`;

  // Construct the full Overpass API URL with the query
  const overpassUrl = `${apiUrl}?data=${encodeURIComponent(overpassQuery)}`;

  // Use the fetch API to make the request
  return fetch(overpassUrl)
    .then(response => response.json())
    .then(data => {
      // Process the data as needed
      // console.log(data);
      const airportdata = data.elements.map((item, index) => item.tags);
      //   console.log({airportdata});
      return airportdata;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

export const flightApi = async () => {
  return fetch(aviation_url + '&departure_iata=CCU')
    .then(response => response.json())
    .then(data => {
      console.log('data', result.data);
    })
    .catch(error => {
      console.error(error);
    });
};
