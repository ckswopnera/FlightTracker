import {aviation_url} from './url';

const lat = 22.639416535722226;
const long = 88.34107229852647;
const radius_airport = 50000;
const day = 10;
var monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
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

export const getDateAfterGivenDays = days => {
  var time = new Date();
  var parsedDays = parseInt(days);

  time.setDate(time.getDate() + parsedDays);

  var strdate = time.toISOString().split('T')[0];
  return strdate;
};

export const getSelectedDatesInShort = timestamp => {
  // Convert the timestamp to a Date object
  var date = new Date(timestamp);

  // Extract the date part
  var year = date.getFullYear();
  // var month = date.getMonth() + 1; // Month is zero-based, so we add 1
  var monthIndex = date.getMonth();

  var day = date.getDate();
  // Format the date as 'YYYY-MM-DD'
  // var formattedDate = year + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
  // console.log(formattedDate); // Output: 2024-02-18

  var formattedDate =
    (day < 10 ? '0' : '') + day + ' ' + monthNames[monthIndex];  // Output: 18 Feb

  return formattedDate;
};
