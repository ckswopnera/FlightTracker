const within_near_to=`https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=police+station&apiKey=${YAHOO_API_KEY}&limit=2`
const within_radius=`https://discover.search.hereapi.com/v1/discover?in=circle:${latitude},${longitude};r=5000&q=hospital&apiKey=${YAHOO_API_KEY}`
const geoapify_near_to_tourist_place=`https://api.geoapify.com/v2/places?categories=${categories}&bias=proximity:7.744380838810624,48.5873243&limit=${limit}&apiKey=${GEOAPIFY_API_KEY}`