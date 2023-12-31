import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Animated_loader from './Animated_Component/Loader';
export default function WebViewScreen() {
  const [location, setLocation] = useState();
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    travel_check();
  }, []);
  const travel_check = async () => {
    setIsloading(true);
    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setLocation(info.coords);
        setIsloading(false);
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
      {isloading && <Animated_loader />}
      {location !== undefined && (
        <WebView
          // source={{uri: 'https://vividmaps.com/world-airports/'}}
          source={{
            uri: `https://opentripmap.com/en/#11/${location?.latitude}/${location?.longitude}`,
          }}
          style={{flex: 1}}
        />
      )}
    </>
  );
}
