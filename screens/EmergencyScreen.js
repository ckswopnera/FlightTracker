import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {ListItem} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BottomSheet, Button, Divider, Input} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Animated_loader from './Animated_Component/Loader';
import Skeleton from './Animated_Component/Skeleton';
import {useRoute} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const EmergencyScreen = () => {
  const [hospitalData, sethospitalData] = useState();
  const [policeData, setpoliceData] = useState();
  const [fireStationData, setfireStationData] = useState();
  const [my_Location, setMy_Location] = useState(null);
  const navigation = useNavigation();

  const [searchHospitalName, setsearchHospitalName] = useState();
  const [searchPoliceStationName, setsearchPoliceStationName] = useState();
  const [searchFireStationName, setsearchFireStationName] = useState();

  const [isVisibleDiameter, setIsVisibleDiameter] = useState(false);

  const [expandedHospital, setExpandedHospital] = useState(true);
  const [expandedPolice, setExpandedPolice] = useState(false);
  const [expandedFirestaion, setExpandedFirestaion] = useState(false);

  const [radius_hospital, setradius_hospital] = useState(2000);
  const [radius_police, setradius_police] = useState(10000);
  const [radius_fire_station, setradius_fire_station] = useState(20000);
  const [selected_index_radius, setselected_index_radius] = useState();

  const [isLoading, setisLoading] = useState(false);
  const [isLoadingFirstRender, setisLoadingFirstRender] = useState(true);

  const list = [
    {
      id: 0,
      title: 'Within 2 Km',
      value: 2000,
      // onPress: () => {setradius_hospital(2000);setIsVisibleDiameter(false)},
    },
    {
      id: 1,
      title: 'Within 5 Km',
      value: 5000,
    },
    {
      id: 2,
      title: 'Within 10Km',
      value: 10000,
    },
    {
      id: 3,
      title: 'Within 20Km',
      value: 20000,
    },
    {
      id: 4,
      title: 'Within 50Km',
      value: 50000,
    },

    {
      id: 5,
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisibleDiameter(false),
    },
  ];

  const route = useRoute();

  useEffect(() => {
    // Access the updated params and do something with it
    const VisibleDiameter = route.params?.isVisibleDiameter || false;
    // console.log({VisibleDiameter});
    setIsVisibleDiameter(VisibleDiameter);
  }, [route]);

  useEffect(() => {
    // setisLoadingFirstRender(true);
    setTimeout(() => {
      setisLoadingFirstRender(false);
    }, 2000);
  }, []);
  useEffect(() => {
    hospitalCheck();
  }, [radius_hospital]);
  useEffect(() => {
    policeCheck();
  }, [radius_police]);
  useEffect(() => {
    fireStation();
  }, [radius_fire_station]);
  const hospitalCheck = async () => {
    setisLoading(true);

    sethospitalData([]);

    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
    await Geolocation.getCurrentPosition(
      info => {
        // console.log({info});
        const {latitude, longitude} = info.coords;
        setMy_Location(info.coords);
        const overpassQuery = `
    [out:json];
    node(around:${radius_hospital},${latitude}, ${longitude})["amenity"="hospital"];
    out;
    `;
        fetch(overpassEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            // console.log(data);
            const hospital_dictrict_data = data.elements.map(
              (item, index) => item,

              // (item, index) => item.tags,
              // item.tags['addr:district'],
            );
            // const hospital_lat_lon_data = data.elements.map(
            //   (item, index) => [item.lat,item.lon],
            // );
            // console.log({hospital_lat_lon_data});
            sethospitalData(hospital_dictrict_data);
          })
          .then(() => setisLoading(false))
          .catch(
            error => {
              // Handle errors here
              console.error('Error:', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const policeCheck = async () => {
    setisLoading(true);

    setpoliceData([]);

    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
    await Geolocation.getCurrentPosition(
      info => {
        // console.log({info});
        const {latitude, longitude} = info.coords;
        const overpassQuery = `
    [out:json];
    node(around:${radius_police},${latitude}, ${longitude})["amenity"="police"];
    out;
    `;
        fetch(overpassEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            // console.log(data);
            const police_data = data.elements.map(
              (item, index) => item,
              // item.tags['addr:district'],
            );
            // console.log({police_data});
            setpoliceData(police_data);
          })
          .then(() => setisLoading(false))
          .catch(
            error => {
              // Handle errors here
              console.error('Error:', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const fireStation = async () => {
    setisLoading(true);

    setfireStationData([]);

    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
    await Geolocation.getCurrentPosition(
      info => {
        // console.log({info});
        const {latitude, longitude} = info.coords;
        const overpassQuery = `
    [out:json];
    node(around:${radius_fire_station},${latitude}, ${longitude})["amenity"="fire_station"];
    out;
    `;
        fetch(overpassEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            // console.log(data);
            const fire_station_data = data.elements.map(
              (item, index) => item,
              // item.tags['addr:district'],
            );
            // console.log({fire_station_data});
            setfireStationData(fire_station_data);
          })
          .then(() => setisLoading(false))
          .catch(
            error => {
              // Handle errors here
              console.error('Error:', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const expanded_Hospital = () => {
    if (expandedHospital === false) {
      setExpandedHospital(true);
      setExpandedPolice(false);
      setExpandedFirestaion(false);
    } else setExpandedHospital(false);
  };
  const expanded_Police = () => {
    if (expandedPolice === false) {
      setExpandedHospital(false);
      setExpandedPolice(true);
      setExpandedFirestaion(false);
    } else setExpandedPolice(false);
  };
  const expanded_Firestation = () => {
    if (expandedFirestaion === false) {
      setExpandedHospital(false);
      setExpandedPolice(false);
      setExpandedFirestaion(true);
    } else setExpandedFirestaion(false);
  };
  return (
    <>
      {isLoadingFirstRender === true ? (
        <Skeleton />
      ) : (
        <FlatList
          ListHeaderComponentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  // borderRadius: 10,
                  width: windowWidth,
                  padding: 6,
                  // borderTopWidth:0.5,
                  borderBottomWidth: 0.5,
                  borderColor: 'rgba(0,0,0,0.4)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '60%',
                  }}>
                  <MaterialCommunityIcons
                    name="hospital"
                    size={30}
                    color="red"
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    Hospital
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '40%',
                  }}>
                  <AntDesign
                    name={expandedHospital === false ? 'down' : 'up'}
                    size={20}
                    style={{marginRight: 8}}
                    color="rgba(0,0,0,0.6)"
                    onPress={() => expanded_Hospital()}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  // borderRadius: 10,
                  width: windowWidth,
                  padding: 6,
                  // borderTopWidth:0.5,
                  borderBottomWidth: 0.5,
                  borderColor: 'rgba(0,0,0,0.4)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '60%',
                  }}>
                  <MaterialIcons
                    name="local-police"
                    size={25}
                    color="#6889FF"
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                      paddingLeft: 8,
                    }}>
                    Police Station
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '40%',
                  }}>
                  <AntDesign
                    name={expandedPolice === false ? 'down' : 'up'}
                    size={20}
                    style={{marginRight: 8}}
                    color="rgba(0,0,0,0.6)"
                    onPress={() => expanded_Police()}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  // borderRadius: 10,
                  width: windowWidth,
                  padding: 6,
                  // borderTopWidth:0.5,
                  borderBottomWidth: 0.5,
                  borderColor: 'rgba(0,0,0,0.4)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '60%',
                  }}>
                  <MaterialCommunityIcons
                    name="fire-truck"
                    size={30}
                    color="red"
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                      paddingLeft: 8,
                    }}>
                    Fire Station
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '40%',
                  }}>
                  <AntDesign
                    name={expandedFirestaion === false ? 'down' : 'up'}
                    size={20}
                    style={{marginRight: 8}}
                    color="rgba(0,0,0,0.6)"
                    onPress={() => expanded_Firestation()}
                  />
                </View>
              </View>
              {isLoading && <Animated_loader />}

              <BottomSheet isVisible={isVisibleDiameter}>
                {list.map((l, i) => (
                  <ListItem
                    key={i}
                    containerStyle={l.containerStyle}
                    onPress={() => {
                      // console.log({i});
                      if (l.title === 'Cancel') {
                        setIsVisibleDiameter(false);
                      } else {
                        setradius_hospital(l.value);
                        setradius_police(l.value);
                        setradius_fire_station(l.value);
                        setselected_index_radius(i);
                        setIsVisibleDiameter(false);
                      }
                    }}
                    bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title style={l.titleStyle}>
                        {l.title}
                      </ListItem.Title>
                    </ListItem.Content>
                    {l.id === selected_index_radius ? (
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
          }
          data={
            expandedHospital === true
              ? hospitalData
              : expandedPolice === true
              ? policeData
              : fireStationData
          }
          initialNumToRender={5}
          renderItem={({item, index}) => {
            // console.log({item});
            return (
              <TouchableOpacity
                onPress={() => {
                  // console.log({item});
                  if (my_Location) {
                    navigation.navigate('Tourism', {
                      myLocation: my_Location,
                      place_details: [
                        {
                          lat: item.lat,
                          lon: item.lon,
                          name: item.tags.name,
                          address_line2:
                            item?.tags?.amenity == 'fire_station'||item?.tags?.amenity == 'police'
                              ? item?.tags?.['addr:housenumber'] +' '+
                                item?.tags?.['addr:street']
                              : item?.tags?.['addr:full'],
                        },
                      ],
                    });
                  }
                }}>
                {expandedHospital && (
                  <View
                    style={{
                      padding: 4,
                      borderBottomWidth: 0.5,
                      borderColor: 'rgba(0,0,0,0.4)',
                    }}>
                    <View
                      style={{
                        marginHorizontal: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <MaterialCommunityIcons
                        name="hospital-marker"
                        size={25}
                        color="red"
                      />
                      <View
                        style={{
                          paddingHorizontal: 7,
                          flexDirection: 'column',
                        }}>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          {item?.tags?.name}
                        </Text>
                        {item?.tags?.['addr:full']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:full']}
                          </Text>
                        ) : (
                          <></>
                        )}

                        <View style={{flexDirection: 'row'}}>
                          {item?.tags?.['addr:housenumber']?.length !==
                          undefined ? (
                            <Text style={{color: '#000', paddingRight: 5}}>
                              {item?.tags?.['addr:housenumber']}
                            </Text>
                          ) : (
                            <></>
                          )}
                          {item?.tags?.['addr:street']?.length !== undefined ? (
                            <Text style={{color: '#000'}}>
                              {item?.tags?.['addr:street']}
                            </Text>
                          ) : (
                            <></>
                          )}
                        </View>
                        {item?.tags?.['addr:city']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:city']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['addr:district']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:district']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['addr:state']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:state']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['addr:postcode']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:postcode']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.phone?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.phone}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['contact:phone']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['contact:phone']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['operator:type']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            Operator type: {item?.tags?.['operator:type']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['healthcare:speciality']?.length !==
                        undefined ? (
                          <Text style={{color: '#000'}}>
                            Speciality: {item?.tags?.['healthcare:speciality']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.website?.length !== undefined ? (
                          <Text style={{color: '#6889FF', fontWeight: '600'}}>
                            {item?.tags?.website}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.website?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            Source: {item?.tags?.source}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                {expandedPolice && (
                  <View
                    style={{
                      padding: 4,
                      borderBottomWidth: 0.5,
                      borderColor: 'rgba(0,0,0,0.4)',
                    }}>
                    <View
                      style={{
                        marginHorizontal: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <MaterialIcons
                        name="local-police"
                        size={20}
                        color="#6889FF"
                      />
                      <View
                        style={{
                          paddingHorizontal: 7,
                          flexDirection: 'column',
                        }}>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          {item?.tags?.name}
                        </Text>
                        {item?.tags?.['addr:full']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:full']}
                          </Text>
                        ) : (
                          <></>
                        )}

                        <View style={{flexDirection: 'row'}}>
                          {item?.tags?.['addr:housenumber']?.length !==
                          undefined ? (
                            <Text style={{color: '#000', paddingRight: 5}}>
                              {item?.tags?.['addr:housenumber']}
                            </Text>
                          ) : (
                            <></>
                          )}
                          {item?.tags?.['addr:street']?.length !== undefined ? (
                            <Text style={{color: '#000'}}>
                              {item?.tags?.['addr:street']}
                            </Text>
                          ) : (
                            <></>
                          )}
                        </View>
                        {item?.tags?.['addr:city']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:city']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['addr:postcode']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:postcode']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.phone?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.phone}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.website?.length !== undefined ? (
                          <Text style={{color: '#6889FF', fontWeight: '600'}}>
                            {item?.tags?.website}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                {expandedFirestaion && (
                  <View
                    style={{
                      padding: 4,
                      borderBottomWidth: 0.5,
                      borderColor: 'rgba(0,0,0,0.4)',
                    }}>
                    <View
                      style={{
                        marginHorizontal: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <MaterialCommunityIcons
                        name="fire-truck"
                        size={25}
                        color="red"
                      />
                      <View
                        style={{
                          paddingHorizontal: 7,
                          flexDirection: 'column',
                        }}>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          {item?.tags?.name}
                        </Text>
                        {item?.tags?.['addr:full']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:full']}
                          </Text>
                        ) : (
                          <></>
                        )}

                        <View style={{flexDirection: 'row'}}>
                          {item?.tags?.['addr:housenumber']?.length !==
                          undefined ? (
                            <Text style={{color: '#000', paddingRight: 5}}>
                              {item?.tags?.['addr:housenumber']}
                            </Text>
                          ) : (
                            <></>
                          )}
                          {item?.tags?.['addr:street']?.length !== undefined ? (
                            <Text style={{color: '#000'}}>
                              {item?.tags?.['addr:street']}
                            </Text>
                          ) : (
                            <></>
                          )}
                        </View>
                        {item?.tags?.['addr:city']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:city']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.['addr:postcode']?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.['addr:postcode']}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.phone?.length !== undefined ? (
                          <Text style={{color: '#000'}}>
                            {item?.tags?.phone}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {item?.tags?.website?.length !== undefined ? (
                          <Text style={{color: '#6889FF', fontWeight: '600'}}>
                            {item?.tags?.website}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <>
              {isLoading ? (
                <View
                  style={{
                    height: windowHeight / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <View
                  style={{
                    height: windowHeight / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    No data available !
                  </Text>
                </View>
              )}
            </>
          }
          // onEndReached={()=> <ActivityIndicator size="large" />}
          // onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

export default React.memo(EmergencyScreen);

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 8,
    width: 100,
  },
});
