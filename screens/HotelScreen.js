import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {GEOAPIFY_API_KEY, YAHOO_API_KEY, PEXELS_IMAGE_API_KEY} from '@env';
const HotelScreen = () => {
  const markers = [
    { id: 1, title: 'Marker 1', lat: 37.78825, lon: -122.4324,color: 'red' },
    { id: 2, title: 'Marker 2', lat: 37.78925, lon: -122.4344,color: 'green' },
    // Add more markers as needed
  ];

  const generateMarkersScript = () => {
    return markers
      .map(
        marker =>
          `L.marker([${marker.lat}, ${marker.lon}]).bindPopup('${marker.title}').addTo(map);`
      )
      .join('\n');
  };
  // const generateMarkersScript = () => {
  //   return markers
  //     ?.map(
  //       marker =>
  //         `L.marker([${marker?.lat}, ${marker?.lon}], {icon: L.divIcon({className: 'custom-marker', html: '<i style="color:${marker?.color};" class="fas fa-map-marker-alt"></i>', iconSize: [25, 41], iconAnchor: [12, 41]})}).bindPopup('${marker?.title}').addTo(map);`,
  //     )
  //     .join('\n');
  // };

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
          var map = L.map('map').setView([${markers[0].lat}, ${markers[0].lon}], 13);
          // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          //   attribution: '© OpenStreetMap contributors'
          // }).addTo(map);

          L.tileLayer('https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map);
          ${generateMarkersScript()}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
      <WebView
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default HotelScreen;

