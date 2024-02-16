import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, Linking, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {GEOAPIFY_API_KEY} from '@env';
import {useRoute} from '@react-navigation/native';
import {BottomSheet, Button, Divider, Input} from '@rneui/base';
import {ListItem} from '@rneui/themed';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native';
import {Alert} from 'react-native';
import Animated_loader from './Animated_Component/Loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function TourismScreen(props) {
  const my_Location = props?.route?.params?.myLocation;
  const placeDetails = props?.route?.params?.place_details;
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState();
  const [isVisibleLayers, setIsVisibleLayers] = useState(false);
  const [selected_index_layers, setselected_index_layers] = useState(0);
  const [selected_layers, setselected_layers] = useState('osm-carto');
  const [nearBy, setNearBy] = useState();
  const [images, setImages] = useState();

  const webRef = useRef(null);

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
          // console.log('query', query);
          allResults.push(
            {
              title: 'My location',
              add: '',
              lat: my_Location?.latitude,
              lon: my_Location?.longitude,
              categories: '',
            },
            {
              title: query.name,
              add: query?.address_line2,
              lat: query?.lat,
              lon: query?.lon,
              categories: query?.categories,
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
    getDetailsByName_wikipedia(props?.route?.params?.place_details[0].name);
    getImagesByName_wikipedia(props?.route?.params?.place_details[0].name);
    // chatGpt_text_search('Write something creative.');
    // console.log('det', props?.route?.params?.place_details[0]);
    // console.log("loc",props?.route?.params?.myLocation)
  }, []);

  const getImagesByName_wikipedia = async name => {
    try {
      const data = await fetch(
        `https://commons.wikimedia.org/w/api.php?prop=pageimages%7Cimageinfo%7Cinfo%7Credirects&gsrnamespace=6&pilimit=max&pithumbsize=300&iiprop=extmetadata&iiextmetadatafilter=ImageDescription&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:${name}&gsrlimit=10`,
      );
      const opensearchData = await data.json();
      // console.log('opensearchData', opensearchData);
      // const total_data = Object.values(opensearchData?.query?.pages);
      const allResults = [];
      for (const key in opensearchData.query.pages) {
        if (opensearchData.query.pages.hasOwnProperty(key)) {
          const value = opensearchData.query.pages[key];
          allResults.push(value?.thumbnail?.source);

          // break;
        }
      }
      // console.log('All results:', allResults);
      setImages(allResults);
    } catch {
      err => console.log(err);
    }
  };
  const getDetailsByName_wikipedia = async name => {
    setLoading(true);
    // console.log({name});

    try {
      const data = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts%7Cpageimages%7Cinfo&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`,
      );
      const opensearchData = await data.json();
      // console.log('opensearchData', opensearchData);
      // const total_data = Object.values(opensearchData?.query?.pages);
      for (const key in opensearchData.query.pages) {
        if (opensearchData.query.pages.hasOwnProperty(key)) {
          const value = opensearchData.query.pages[key];
          // console.log(`Key: ${key}`);
          console.log('Value:', value);
          setNearBy(value);
          // setImages(value?.thumbnail?.source);
          break;
        }
      }
      // setNearBy(total_data[0].extract);
      // console.log(total_data[0].extract);
      // setTimeout(() => {
      setLoading(false);
      // }, 3000);
    } catch {
      err => console.log(err);
    }
  };

  const generateMarkersScript = () => {
    return markers
      ?.map(
        marker =>
          `L.marker([${marker?.lat}, ${
            marker?.lon
          }], {icon: L.icon({iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=red&apiKey=${GEOAPIFY_API_KEY}'})}).bindPopup("${
            marker?.title
          }${marker?.add ? '<br>' + marker?.add : ''}${
            marker?.categories
              ? '<br>' +
                '<br>' +
                marker?.categories.toString().split(',').join('<br />')
              : ''
          }").addTo(map);`,
      )
      .join('\n');
  };
  // const generateMarkersScript = async () => {
  //   // Fetch OSRM route information
  //   const osrmUrl = 'https://router.project-osrm.org/route/v1/car/' +
  //     parseFloat(markers[0]?.lat).toFixed(6) + ',' +
  //     parseFloat(markers[0]?.lon).toFixed(6) + ';' +
  //     parseFloat(markers[1]?.lat).toFixed(6) + ',' +
  //     parseFloat(markers[1]?.lon).toFixed(6) +
  //     '?overview=simplified' +
  //     '&alternatives=3' +
  //     '&steps=false' +
  //     '&annotations=false' +
  //     '&geometries=geojson';
  
  //   let osrmRoute;
  //   try {
  //     const response = await fetch(osrmUrl);
  //     const data = await response.json();
  //     osrmRoute = data.routes[0].geometry.coordinates;
  //   } catch (error) {
  //     console.error('Error fetching OSRM route:', error);
  //   }
  
  //   // Create markers and polyline
  //   return markers
  //     ?.map(
  //       (marker, index) =>
  //         `L.marker([${marker?.lat}, ${marker?.lon}], {icon: L.icon({iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=red&apiKey=${GEOAPIFY_API_KEY}'})}).bindPopup("${
  //           marker?.title
  //         }${marker?.add ? '<br>' + marker?.add : ''}${
  //           marker?.categories
  //             ? '<br>' +
  //               '<br>' +
  //               marker?.categories.toString().split(',').join('<br />')
  //             : ''
  //         }").addTo(map);`
  //     )
  //     .join('\n') +
  //     (osrmRoute
  //       ? `\nL.polyline(${JSON.stringify(osrmRoute)}, { color: 'blue' }).addTo(map);`
  //       : '');
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
            <style>
      /* Add your styles here */
      body {
        color: #333; /* Change color as needed */
      }

      h1 {
        color: #1E90FF ; /* Change color as needed */
      }

      a {
        color: green; /* Change color as needed */
        text-decoration: none; /* Remove underline if needed */
      }
    </style>
          </head>
          <body>
            <div id="map" style="height: 50vh;"></div>
            <script>
              var map = L.map('map').setView([${my_Location?.latitude},${
    my_Location?.longitude
  }], 12);
              // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              //   attribution: '© OpenStreetMap contributors'
              // }).addTo(map);
              // L.tileLayer('https://maps.geoapify.com/v1/tile/${selected_layers}/{z}/{x}/{y}@2x.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map); -- for 2x image quality
              L.tileLayer('https://maps.geoapify.com/v1/tile/${selected_layers}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map);


               ${generateMarkersScript()}
               
            </script>
    <br/>
    <h1><u>${nearBy?.title}</u></h1>
   
           ${nearBy?.extract}
           
           <a href=${nearBy?.fullurl} style="font-size:20px">${nearBy?.fullurl}
       </a>
       <br/>
    <br/>

    <br/>


            <img src="${
              nearBy?.thumbnail?.source
            }" style="width: 100%; height: auto;" />

            <br/>
            </br/>
            <h2>Other Images</h2>
            
            ${images
              ?.map(
                imageUrl =>
                  `<img src="${imageUrl}" style="width: 50%; height: auto; marginHorizontal:2px;marginVertical:2px" />`,
              )
              .join('')}
    
          </body>
        </html>
      `;
  const htmlContent_for_undefined = `
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
        // L.tileLayer('https://maps.geoapify.com/v1/tile/${selected_layers}/{z}/{x}/{y}@2x.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map); -- for 2x image quality
        L.tileLayer('https://maps.geoapify.com/v1/tile/${selected_layers}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}').addTo(map);


         ${generateMarkersScript()}
         
      </script>

    </body>
  </html>
`;

  return (
    <>
      {loading && (
        <>
          <Animated_loader />
          {/* <Text style={{textAlign: 'center', fontSize: 18}}>Loading...</Text> */}
        </>
      )}
      {loading === false && nearBy?.extract !== undefined ? (
        <WebView
          showsVerticalScrollIndicator={false}
          setBuiltInZoomControls={false}
          automaticallyAdjustContentInsets={false}
          textZoom={75}
          // containerStyle={{backgroundColor:'red'}}
          originWhitelist={['*']}
          source={{
            html: `${htmlContent}`,
          }}
          injectedJavaScript={`
        const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (!iOS) {
          const meta = document.createElement('meta');
          let initialScale = 1;
          if(screen.width <= 800) {
           initialScale = ((screen.width / window.innerWidth) + 0.1).toFixed(2);
          }
          const content = 'width=device-width, initial-scale=' + initialScale ;
          meta.setAttribute('name', 'viewport');
          meta.setAttribute('content', content);
          document.getElementsByTagName('head')[0].appendChild(meta);
        }
      `}
          scalesPageToFit={Platform.OS === 'ios'}
        />
      ) : (
        <WebView
          source={{html: htmlContent_for_undefined}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // automaticallyAdjustContentInsets={false}
        />
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
    </>
  );
}
