import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default function TourismScreen(props) {
  const my_Location = props?.route?.params?.myLocation;

  const placeDetails = props?.route?.params?.place_details;
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState();

  const mapLocation = async () => {
    setLoading(true);

    const allResults = [];
    if (placeDetails !== undefined) {
      for (const query of placeDetails) {
        if (query?.name !== undefined) {
          allResults.push(
            {
              title: 'My location',
              add: '',
              lat: my_Location?.latitude,
              lon: my_Location?.longitude,
            },
            {
              title: query?.name,
              add: query?.address_line2,
              lat: query?.lat,
              lon: query?.lon,
            },
          );
        }
      }
    }
    setMarkers(allResults);
    setLoading(false);
  };
  useEffect(() => {
    mapLocation();
  }, []);
  const generateMarkersScript = () => {
    return markers
      ?.map(
        marker =>
          `L.marker([${marker?.lat}, ${marker?.lon}]).bindPopup('${marker?.title}<br>${marker?.add}').addTo(map);`,
      )
      .join('\n');
  };

  const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>OpenStreetMap with Markers</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          </head>
          <body>
            <div id="map" style="height: 100vh;"></div>
            <script>
              var map = L.map('map').setView([${my_Location?.latitude},${
    my_Location?.longitude
  }], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
              }).addTo(map);
              ${generateMarkersScript()}
            </script>
          </body>
        </html>
      `;

  return (
    <View style={{flex: 1, ...StyleSheet.absoluteFillObject}}>
      {loading === false ? (
        <WebView
          source={{html: htmlContent}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : (
        <Text style={{textAlign: 'center', fontSize: 18}}>Loading...</Text>
      )}
    </View>
  );
}
