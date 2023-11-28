import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GEOAPIFY_API_KEY, YAHOO_API_KEY, PEXELS_IMAGE_API_KEY} from '@env';
import Geolocation from '@react-native-community/geolocation';
import RNFetchBlob from 'rn-fetch-blob';
import Animated_loader from './Animated_Component/Loader';
import FastImage from 'react-native-fast-image'

const imageLinks = [
  {src: require('../assets/image/maps/world-map.png'), title: 'world-map'},
  {
    src: require('../assets/image/maps/Map-of-all-airports-included-in-risk-model.png'),
    title: 'Map-of-all-airports-included-in-risk-model',
  },
  {
    src: require('../assets/image/maps/world_airport_byaltitude.png'),
    title: 'world_airport_byaltitude',
  },
  {
    src: require('../assets/image/maps/world_airport_bytemperature.png'),
    title: 'world_airport_bytemperature',
  },
  {
    src: require('../assets/image/maps/world_airport_bytype.png'),
    title: 'world_airport_bytype',
  },

  {
    src: require('../assets/image/maps/world_airport_bywindspeed.png'),
    title: 'world_airport_bywindspeed',
  },
  {
    src: require('../assets/image/maps/world_airport_map.png'),
    title: 'world_airport',
  },
  {
    src: require('../assets/image/maps/world_airport3.png'),
    title: 'world_airport',
  },
  {src: require('../assets/image/maps/world_map.png'), title: 'world_map'},
  {
    src: require('../assets/image/maps/world_road.png'),
    title: 'world_map_road',
  },
  {
    src: require('../assets/image/maps/world_seaports.png'),
    title: 'world_seaports',
  },
];
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function FlightScreen() {
  const navigation = useNavigation();
  const [location, setlocation] = useState();
  const [imagesrc, setImagesrc] = useState();
  const [place_name, setPlace_name] = useState();
  const [photo_pressed_id, setphoto_pressed_id] = useState();
  const [loading, setLoading] = useState(true);

  const place_image = async () => {
    const search_data = 'Frances Johnson’s Mausoleum';

    fetch(`https://api.pexels.com/v1/search?query=${search_data}&per_page=1`, {
      headers: {
        Authorization: PEXELS_IMAGE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

        setImagesrc(result?.photos);
        const image = result?.photos?.map((i, j) => i?.src?.large);
        console.log({image});
      })
      .catch(err => console.log(err));
  };
  const place_details = async () => {
    setLoading(true);
    // Define the categories of tourist places
    const category = 'tourism.sights';

    // Define the rectangular area by the coordinates of the south-west and north-east corners
    const filter = 'rect:7.735282,48.586797,7.756289,48.574457';

    // Define the limit of results
    const limit = 10;

    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        // Make a request to the Nominatim API for reverse geocoding
        fetch(
          `https://api.geoapify.com/v2/places?categories=${category}&bias=proximity:${longitude},${latitude}&limit=${limit}&apiKey=${GEOAPIFY_API_KEY}`,
        )
          .then(response => response.json())
          .then(places => {
            // console.log('Places', places?.features);
            const place_name = places?.features?.map((i, l) => i?.properties);
            const place_address = places?.features?.map(
              (i, l) => i?.properties?.address_line2,
            );
            // console.log({place_address});
            // setPlace_name(place_name);
            performMultipleSearches(place_name);
          })

          .catch(error => {
            // Handle errors
            console.error('Error:', error);
          });
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  async function searchPexels(query) {
    const photo_count = 1;
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query,
    )}&per_page=${photo_count}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: PEXELS_IMAGE_API_KEY,
      },
    });

    if (!response.ok) {
      // throw new Error(`Failed to fetch data! Status: ${response.status}`);
      Alert.alert('Failed to fetch data!');
    }

    const data = await response.json();
    return data;
  }

  // Function to perform multiple searches from an array of queries
  async function performMultipleSearches(queries) {
    try {
      // console.log({queries})
      const allResults = [];
      for (const query of queries) {
        // console.log('query',query)
        // console.log('query?.name',query?.name)
        if (query?.name !== undefined) {
          const results = await searchPexels(query?.name);
          // console.log(`Results for ${query}:`, results?.photos);
          const image = results?.photos?.map((i, j) => i?.src?.large);
          // const image22 = results?.photos?.map((i, j) => i?.alt);

          // console.log({image22});
          allResults.push({query, image});
        }
      }
      // console.log('All results:', allResults);
      setImagesrc(allResults);
      setLoading(false);
      // Alternatively, you can use Promise.all for concurrent requests
      // const resultsArray = await Promise.all(queries.map(query => searchPexels(query)));
      // resultsArray.forEach((results, index) => console.log(`Results for ${queries[index]}:`, results));
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const tourist_check = async () => {
    const category = 'Tourist Information';
    const radius = 10000;

    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        // Make a request to the Nominatim API for reverse geocoding
        fetch(
          `https://discover.search.hereapi.com/v1/discover?in=circle:${latitude},${longitude};r=${radius}&q=${category}&apiKey=${YAHOO_API_KEY}&limit=4`,
        )
          .then(response => response.json())
          .then(data => {
            const address = data.items.map((i, l) => i?.address?.label);

            // const contact = address?.map((item, index) => item);
            // console.log({contact});
            console.log('address', address);
          })

          .catch(error => {
            // Handle errors
            console.error('Error:', error);
          });
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  useEffect(() => {
    place_details();
    // tourist_check();
    // place_image();
  }, []);

  return (
    <>
    {loading && <Animated_loader />}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}>
      <TouchableOpacity
        style={{
          borderRadius: 8,
          width: windowWidth - 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 14,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <Ionicons
          name="search-sharp"
          size={20}
          color="#000"
          style={{paddingLeft: 10, paddingRight: 20}}
        />
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          Find a flight
        </Text>
      </TouchableOpacity>
      <View
        style={{
          //   height: 450,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 50,
          width: '100%',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            // textAlign: 'left',
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
          Explore from your city
        </Text>
        <Image
          source={require('../assets/image/maps/world_airport3.png')}
          style={{
            height: 300,
            width: windowWidth - 20,
            borderRadius: 8,
            padding: 10,
          }}
          resizeMethod="auto"
          resizeMode="contain"
        />
        <Text style={{color: '#000'}}>See the world on your budget</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Place Search')}
          style={{
            borderRadius: 8,
            width: windowWidth - 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
            backgroundColor: 'rgba(0,0,0,0.8)',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '500',
            }}>
            Let's go
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //   height: 450,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 50,
          width: '100%',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            // textAlign: 'left',
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
          World Map
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.6)',
            fontSize: 14,
            // textAlign: 'left',
            fontWeight: '500',
            marginBottom: 4,
          }}>
          Discover world map of different graph
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 40,
          }}>
          {imageLinks.map((item, index) => {
            //   console.log({item})

            return (
              <TouchableOpacity
                // onPress={() => navigation.navigate('WebViewScreen')}
                key={index.toString()}
                style={{
                  flexDirection: 'column',
                  height: 120,
                  width: 100,
                  backgroundColor: 'transparent',
                  margin: 4,
                  // borderWidth: 1,
                  // borderColor: '#000',
                  borderRadius: 8,
                }}>
                <ImageBackground
                  source={item?.src}
                  imageStyle={{borderRadius: 8}}
                  style={{height: 100, width: 100,borderRadius: 8,}}
                  resizeMode="contain"
                >
                {loading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.loadingText}>Loading...</Text>
                  </View>
                )}
                </ImageBackground>
                <Text style={{color: '#000', textAlign: 'center',fontSize:10,fontWeight:'bold',}}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          //   height: 450,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 10,
          width: '100%',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            // textAlign: 'left',
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
          Get inspired
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.6)',
            fontSize: 14,
            // textAlign: 'left',
            fontWeight: '500',
            marginBottom: 4,
          }}>
          Discover your next adventure
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            // paddingBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {imagesrc?.map((i, j) => {
            // console.log({i});

            return i?.image?.map((k, m) => {
              // console.log({k});
              return (
                <TouchableOpacity
                  onPress={() => {
                    setphoto_pressed_id(j);
                  }}
                  key={m.toString()}
                  style={{
                    flexDirection: 'column',
                    height: 120,
                    width: 100,
                    margin: 4,
                    borderRadius: 8,
                    backgroundColor: 'transparent',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // position: 'absolute',
                    // bottom: 0,
                  }}>
                  {/* <ImageBackground
                    source={{uri: k}}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                    }}
                    resizeMode="cover"
                    imageStyle={{borderRadius: 8}}>
                    {loading && (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.loadingText}>Loading...</Text>
                      </View>
                    )}
                    {j === photo_pressed_id ? (
                      <View
                        style={{
                          // zIndex: 9999,
                          height: 35,
                          width: 100,
                          backgroundColor: 'red',
                          position: 'absolute',
                          bottom: 0,
                          // right: 0,
                          // borderBottomEndRadius: 8,
                          borderBottomRightRadius: 8,
                          borderBottomLeftRadius: 8,
                          // padding: 4,
                          // marginTop: 6,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 8,
                            textAlign: 'center',
                          }}>
                          {i?.query?.address_line2}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </ImageBackground> */}
<FastImage
        style={{ width: 100, height: 100,borderRadius: 8, }}
        source={{
            uri: k,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    >
      {loading && (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.loadingText}>Loading...</Text>
                      </View>
                    )}
{j === photo_pressed_id ? (
                      <View
                        style={{
                          // zIndex: 9999,
                          height: 35,
                          width: 100,
                          backgroundColor: 'red',
                          position: 'absolute',
                          bottom: 0,
                          // right: 0,
                          // borderBottomEndRadius: 8,
                          borderBottomRightRadius: 8,
                          borderBottomLeftRadius: 8,
                          // padding: 4,
                          // marginTop: 6,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 8,
                            textAlign: 'center',
                          }}>
                          {i?.query?.address_line2}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}

    </FastImage>
                  <Text style={{color: '#000', textAlign: 'center',fontSize:10,fontWeight:'bold',}}>
                    {i?.query?.name}
                  </Text>
                </TouchableOpacity>
              );
            });
          })}
        </ScrollView>
        <Text style={{color: '#000', paddingVertical: 10}}>
          See the world on your budget
        </Text>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    color: '#000',
    fontSize: 8,
    textAlign: 'center',
    // margin: 8,
  },
});
