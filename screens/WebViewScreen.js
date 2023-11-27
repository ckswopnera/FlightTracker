import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
export default function WebViewScreen() {
  const [location, setLocation] = useState();

  useEffect(() => {
    travel_check();
  }, []);
  const travel_check = async () => {
    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setLocation(info.coords);
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  return (
    <>
      {location !== undefined && (
        <WebView
          // source={{uri: 'https://vividmaps.com/'}}
          source={{
            uri: `https://opentripmap.com/en/#11/${location?.latitude}/${location?.longitude}`,
          }}
          style={{flex: 1}}
        />
      )}
    </>
  );
}
