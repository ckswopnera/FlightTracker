import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {GEOAPIFY_API_KEY, YAHOO_API_KEY, PEXELS_IMAGE_API_KEY} from '@env';
import {useRoute} from '@react-navigation/native';
import {BottomSheet, Button, Divider, Input} from '@rneui/base';
import {ListItem} from '@rneui/themed';

export default function TourismScreen(props) {
  const my_Location = props?.route?.params?.myLocation;
  const placeDetails = props?.route?.params?.place_details;
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState();
  const [isVisibleLayers, setIsVisibleLayers] = useState(false);
  const [selected_index_layers, setselected_index_layers] = useState(0);
  const [selected_layers, setselected_layers] = useState('osm-carto');

  const list = [
    {
      id: 0,
      title: 'osm-carto',
      value: 'osm-carto',
    },
    {
      id: 1,
      title: 'osm-liberty',
      value: 'osm-liberty',
    },
    {
      id: 2,
      title: 'toner',
      value: 'toner',
    },
    {
      id: 3,
      title: 'dark-matter-brown',
      value: 'dark-matter-brown',
    },

    {
      id: 4,
      title: 'dark-matter-yellow-roads',
      value: 'dark-matter-yellow-roads',
    },
    {
      id: 5,
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisibleLayers(false),
    },
  ];

  const route = useRoute();

  useEffect(() => {
    // Access the updated params and do something with it
    const VisibleLayers = route.params?.isVisibleLayers || false;
    // console.log({VisibleLayers});
    setIsVisibleLayers(VisibleLayers);
  }, [route]);
  const mapLocation = async () => {
    setLoading(true);

    const allResults = [];
    if (placeDetails !== undefined) {
      for (const query of placeDetails) {
        if (query?.name !== undefined) {
          console.log('query', query.name);
          allResults.push(
            {
              title: 'My location',
              add: '',
              lat: my_Location?.latitude,
              lon: my_Location?.longitude,
            },
            {
              title: query.name,
              add: query?.address_line2,
              lat: query?.lat,
              lon: query?.lon,
            },
          );
        }
      }
    }
    setMarkers(allResults);
    // setTimeout(() => {
    setLoading(false);

    // }, 5000);
  };
  useEffect(() => {
    mapLocation();
    // console.log( "det",props?.route?.params?.place_details)
    // console.log("loc",props?.route?.params?.myLocation)
  }, []);
  const generateMarkersScript = () => {
    // console.log(markers)
    return markers
      ?.map(
        marker =>
          `L.marker([${marker?.lat}, ${marker?.lon}]).bindPopup("${marker?.title}<br>${marker?.add}").addTo(map);`,
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
  }], 12);
              // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              //   attribution: '© OpenStreetMap contributors'
              // }).addTo(map);
              L.tileLayer('https://maps.geoapify.com/v1/tile/${selected_layers}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map);
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
      <BottomSheet isVisible={isVisibleLayers}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={() => {
              // console.log({l});
              if (l.title === 'Cancel') {
                setIsVisibleLayers(false);
              } else {
                setselected_index_layers(i);
                setIsVisibleLayers(false);
                setselected_layers(l?.value);
              }
            }}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
            {l.id === selected_index_layers ? (
              // <MaterialCommunityIcons name="check" size={20} />
              <Image
                source={require('../assets/icon/check_mark.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            ) : (
              <></>
            )}
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}
