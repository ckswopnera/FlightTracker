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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GEOAPIFY_API_KEY, YAHOO_API_KEY, PEXELS_IMAGE_API_KEY} from '@env';
import Geolocation from '@react-native-community/geolocation';
import Animated_loader from './Animated_Component/Loader';
import FastImage from 'react-native-fast-image';
import BottomSheet, {
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheetVIew from '../components/BottomSheetVIew';
import {WebView} from 'react-native-webview';
import {ScrollView as Scroll} from 'react-native-gesture-handler';
import WebViewScreen from './WebViewScreen';
import {Table, Row, Rows} from 'react-native-reanimated-table';

const imageLinks = [
  {
    src: require('../assets/image/maps/world-map.png'),
    title: 'World Map',
    id: 1,
  },
  {
    src: require('../assets/image/maps/Map-of-all-airports-included-in-risk-model.png'),
    title: 'Airports Included In Risk Model',
    id: 2,
  },
  {
    src: require('../assets/image/maps/world_airport_byaltitude.png'),
    title: 'Airports by Altitude',
    id: 3,
    title2: 'Airports with the highest altitude',
    title3: 'Airports with the lowest altitude',
    tableData: [
      ['Heliport', '6705', 'Siachen Glacier AFS Airport', 'India', 'IN-0001'],
      [
        'Small Airport	',
        '5068',
        'Daulat Beg Oldi Advanced Landing Ground',
        'India',
        'IN-0003',
      ],
      ['Medium Airport	', '4367', 'Daocheng Yading Airport', 'China', 'ZUDC'],
      [
        'Large  Airport	',
        '3282',
        'Alejandro Velasco Astete International Airport',
        'Peru',
        'SPZO',
      ],
      [
        'Seaplane Base	',
        '1992',
        'Yellowstone Seaplane Base',
        'United States',
        'US-1087',
      ],
      ['Balloonport', '1713', 'Palisades Field', 'United States', '59ID'],
    ],
    tableData2: [
      ['Medium Airport', '-378', 'Bar Yehuda Airfield', 'Israel', 'LLMZ'],
      [
        'Small Airport',
        '-66',
        'Furnace Creek Airport',
        'United States',
        'KL06',
      ],
      [
        'Heliport',
        '-37',
        'Riverside County Sheriff Thermal Heliport',
        'United States',
        'US-1151',
      ],
      [
        'Seaplane Base',
        '-19',
        'Acushnet River Seaplane Base',
        'United States',
        '6MA8',
      ],
      [
        'Large Airport	',
        '-7',
        'Heydar Aliyev International Airport',
        'Azerbaijan',
        'UBBB7',
      ],
      [
        'Balloonport',
        '2',
        'Cudjoe Key South TARS Site',
        'United States',
        'US-2457',
      ],
    ],
    tableHead: ['TYPE', 'ALTITUDE, M', 'NAME', 'COUNTRY', 'AIRPORT CODE'],
  },
  {
    src: require('../assets/image/maps/world_airport_bytemperature.png'),
    title: 'Airports by Average Temperature',
    id: 4,
    title2: 'Hottest airports by average annual temperature',
    title3: 'Coldest airports by average annual temperature',
    tableData: [
      [
        'Medium Airport',
        '+30.9',
        'Assab International Airport',
        'Eritrea',
        'HHSB',
      ],
      ['Small Airport', '+30.7', 'Kaédi Airport', 'Mauritania', 'GQNK'],
      [
        'Heliport',
        '+30.6',
        'Arafat General Hospital Heliport',
        'Saudi Arabia',
        'SA-0016',
      ],
      [
        'Large Airport',
        '+29.7',
        'Khartoum International Airport',
        'Sudan',
        'HSSS',
      ],
      [
        'Seaplane Base',
        '+28.8',
        'Niyama Private Islands Seaplane Base',
        'Maldives',
        'MV-0008',
      ],
      [
        'Balloonport',
        '+25.0',
        'Cudjoe Key South TARS Site',
        'United States',
        'US-2457',
      ],
    ],
    tableData2: [
      [
        'Medium Airport',
        '-48.4',
        'Jack F. Paulus Skiway',
        'Antarctica',
        'AQ-0005',
      ],
      [
        'Small Airport',
        '-27.1',
        'Summit Ice Landing Strip',
        'Greenland',
        'GL-0006',
      ],
      ['Heliport', '-16.1', '	Station Nord Heliport', 'Greenland', 'BGNO'],
      [
        'Seaplane Base',
        '-13.9',
        'Cambridge Bay Seaplane Base',
        'Canada',
        'CJD7',
      ],
      [
        'Large Airport	',
        '-5.1',
        'Yellowknife International Airpor',
        'Canada',
        'CYZF',
      ],
      ['Balloonport', '+4.3', 'Palisades Field', 'United States', '59ID'],
    ],
    tableHead: [
      'TYPE',
      'AVERAGE TEMPERATURE, °С',
      'NAME',
      'COUNTRY',
      'AIRPORT CODE',
    ],
  },
  {
    src: require('../assets/image/maps/world_airport_bytype.png'),
    title: 'Airports by Type',
    id: 5,
  },

  {
    src: require('../assets/image/maps/world_airport_bywindspeed.png'),
    title: 'Airports by Wind Speed',
    id: 6,
    tableData: [
      ['Heliport', '14.68', 'Berthoud Pass Heliport', 'United States', 'CD37'],
      [
        'Small Airport	',
        '11.22',
        'Mont Llaret Pic d’Aude Airfield',
        'France',
        'FR-0296',
      ],
      [
        'Seaplane Base',
        '9.24',
        'Minstrel Island Seaplane Base',
        'Canada',
        'CAX7',
      ],
      ['Medium Airport', '8.92', 'Matsu Nangan Airport', 'Taiwan', 'RCFG'],
      [
        'Large Airport',
        '6.81',
        'Hato International Airport',
        'Curaçao / Netherland',
        'TNCC',
      ],
      ['Balloonport', '5.30', 'Lydiard Park', '	Great Britain', 'GB-0682'],
    ],
    tableHead: ['TYPE', 'WIND SPEED, M/S', 'NAME', 'COUNTRY', 'AIRPORT CODE'],
  },
  {
    src: require('../assets/image/maps/world_airport_map.png'),
    title: 'World All Airports',
    id: 7,
  },
  {
    src: require('../assets/image/maps/world_airport3.png'),
    title: 'World All Airports',
    id: 8,
  },
  {
    src: require('../assets/image/maps/world_road.png'),
    title: 'World connecting Roads',
    id: 10,
  },
  {
    src: require('../assets/image/maps/world_seaports.png'),
    title: 'World Seaports',
    id: 11,
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
  const {dismiss, dismissAll} = useBottomSheetModal();
  const [imageClick, setImageClick] = useState();
  const tableHead = ['TYPE', 'ALTITUDE, M', 'NAME', 'COUNTRY', 'AIRPORT CODE'];
  const [topTenAirports, settopTenAirports] =
    useState(`Guangzhou, China (CAN) – 43,767,558
  Atlanta, United States (ATL) – 42,918,685
  Chengdu, China (CTU) – 40,741,509
  Dallas/Fort Worth, United States (DFW) – 39,364, 990
  Shenzhen, China (SZX) – 37,916,054
  Beijing, China (PEK) – 34,513,827
  Denver CO, United States (DEN) – 33,741,129
  Kunming, China (KMG) – 32,990,805
  Shanghai, China (SHA) – 31,165,641
  Xi’an, China (XIY) – 31,073,924`);
  let c = 1;

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['70%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const pressed_value = val => {
    console.log('value - ', val);
  };
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
    const limit = 5;

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
    // const value = imageLinks.find(e => e.id === 2);
    // console.log({value});
    // place_details();
    // tourist_check();
    // place_image();
    var final = topTenAirports
      .split('\n')
      .map(function (txt) {
        return c++ + '. ' + txt + '\n';
      })
      .join('');
    settopTenAirports(final);
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
            {imageLinks?.map((item, index) => {
              // console.log({item});

              return (
                <TouchableOpacity
                  onPress={() => {
                    handlePresentModalPress();
                    // console.log({item})
                    setImageClick(item);
                  }}
                  key={index.toString()}
                  style={{
                    flexDirection: 'column',
                    height: 120,
                    width: 100,
                    backgroundColor: 'transparent',
                    margin: 4,
                    borderRadius: 8,
                  }}>
                  <ImageBackground
                    source={item?.src}
                    imageStyle={{borderRadius: 8}}
                    style={{height: 100, width: 100, borderRadius: 8}}
                    resizeMode="cover">
                    {loading && (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.loadingText}>Loading...</Text>
                      </View>
                    )}
                  </ImageBackground>
                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginHorizontal: 4,
            }}>
            <BottomSheetScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="never"
              horizontal={false}
              showsVerticalScrollIndicator={true}
              // style={{ flex: 1}}
              // contentContainerStyle={{flex: 1}}
            >
              {imageLinks?.map((item, index) =>
                item?.id === imageClick?.id ? (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      marginHorizontal: 8,
                      alignItems: 'center',
                      borderRadius: 8,
                      backgroundColor: 'transparent',
                      // justifyContent: 'center',
                    }}>
                    <Image
                      source={item?.src}
                      style={{
                        height: 300,
                        width: '98%',
                        resizeMode: 'contain',
                        borderRadius: 8,
                        marginVertical: 4,

                        // top: 10,
                        // position: 'absolute',
                      }}
                    />
                  </View>
                ) : null,
              )}
              <Text style={styles.HeaderTitle}>{imageClick?.title}</Text>
              <Text style={{textAlign: 'justify', fontSize: 14, padding: 8}}>
                Airports are conveniences to park and support aircraft and a
                control tower. An airport consists of a landing area, which
                contains an aerially open space including at least one
                operationally active surface such as a runway for a plane or a
                helipad, and often includes adjoining service structures. Larger
                airports have airport aprons, air traffic control centers,
                eateries, and lounges. An airport only serving helicopters is
                called a heliport. An airport for use by seaplane aircraft is
                named a seaplane base. Such a base comprises a stretch of open
                water and seaplane docks. The map below shows almost 65 thousand
                existing airports.
              </Text>

              <Text style={{textAlign: 'justify', fontSize: 14, padding: 8}}>
                Small airports account for more than half of all airports in the
                world (36,307). The total number of heliports in the world is
                15,267. The number of medium and large airports is 4,513 and
                653, respectively. In addition, there are 1,064 seaplane bases
                and 37 balloon ports worldwide.
              </Text>

              <Text style={{textAlign: 'justify', fontSize: 14, padding: 8}}>
                College Park Airport, established in 1909 In Maryland (U.S.) by
                Wilbur Wright, is acknowledged as the world’s oldest
                continuously functioning airfield, although it operates only in
                general aviation traffic. Hamburg Airport, which opened in
                January 1911, is the oldest commercial international airport
                worldwide, which is still in operation. Atlanta International
                Airport was the world’s busiest airport by passenger traffic
                from 1998 to 2019 by serving about 110 million travelers every
                year, dropping its title in 2020 due to the effect of the
                coronavirus pandemic and being exceeded by Guangzhou Baiyun
                International Airport as a result.
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  padding: 8,
                  fontWeight: 'bold',
                }}>
                Top 10 world’s busiest airports in 2020 by the total number of
                passengers
              </Text>
              <Text style={{textAlign: 'justify', fontSize: 14, padding: 8}}>
                {topTenAirports}
              </Text>
              {imageClick?.title2 !== undefined ? (
                <Text style={styles.HeaderTitle}>{imageClick?.title2}</Text>
              ) : null}
              {imageClick?.tableData !== undefined ? (
                <View style={{paddingVertical: 10, marginHorizontal: 8}}>
                  <Table borderStyle={styles.table}>
                    <Row
                      data={imageClick?.tableHead}
                      style={styles.rowHead}
                      textStyle={styles.textRowHeader}
                    />
                    <Rows
                      data={imageClick?.tableData}
                      textStyle={styles.textRowBody}
                    />
                  </Table>
                </View>
              ) : null}
              {imageClick?.title3 !== undefined ? (
                <Text style={styles.HeaderTitle}>{imageClick?.title3}</Text>
              ) : null}

              {imageClick?.tableData2 !== undefined ? (
                <View style={{paddingVertical: 10, marginHorizontal: 8}}>
                  <Table borderStyle={styles.table}>
                    <Row
                      data={imageClick?.tableHead}
                      style={styles.rowHead}
                      textStyle={styles.textRowHeader}
                    />
                    <Rows
                      data={imageClick?.tableData2}
                      textStyle={styles.textRowBody}
                    />
                  </Table>
                </View>
              ) : null}
              
            </BottomSheetScrollView>
          </BottomSheetModal>
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
                    <FastImage
                      style={{width: 100, height: 100, borderRadius: 8}}
                      source={{
                        uri: k,
                        // headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}>
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
                    <Text
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                      }}>
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
  HeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  rowHead: {backgroundColor: '#f1f8ff'},
  textRowHeader: {
    textAlign: 'center',
    padding: 2,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textRowBody: {textAlign: 'center', padding: 2, fontSize: 12},
  table: {borderWidth: 2, borderColor: '#c8e1ff'},
});
