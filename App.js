import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Linking} from 'react-native';
import {aviation_url} from './util/url';
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions, // optional
} from 'react-native-animated-nav-tab-bar';
import SearchScreen from './screens/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TripScreen from './screens/TripScreen';
import AccountScreen from './screens/AccountScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import StackScreen_Search from './screens/Stacks/StackScreen_Search';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Alert} from 'react-native';
import {Image} from 'react-native';
import LottieView from 'lottie-react-native';
import StackScreen_Explore from './screens/Stacks/StackScreen_Explore';
import { airportCheck, flightApi } from './util/functions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
function App() {
  const [city, setcity] = useState();
  const [locationPermission, setlocationPermission] = useState();
  const [loading, setloading] = useState(true);

  const Tabs = AnimatedTabBarNavigator();
  const lat = 22.639416535722226;
  const long = 88.34107229852647;
  const radius_airport = 50000;

  const apiUrl = 'https://overpass-api.de/api/interpreter';


  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Error opening app settings:', error);
    }
  };
  const Permission = async () => {
    setloading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'FlightTracker Location Permission',
          message:
            'FlightTracker needs access to your location ' +
            'so you can get awesome things.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setlocationPermission(true);
        console.log('You can use the Location');
      } else {
        setlocationPermission(false);

        Alert.alert('Location permission denied!');
        // openAppSettings();
      }
    } catch (err) {
      console.log({err});
      Alert.alert('Location permission denied!');
    }
      setloading(false);
  };
  useEffect(() => {
    // console.log('url', aviation_url + '&departure_iata=CCU');
    // airportCheck()
    // flightApi();
    Permission();
  }, []);
  return (
    <>
      {loading === true ? (
        <View
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <LottieView
            source={require('./assets/animations/flight_loader.json')}
            autoPlay
            loop
            style={{height: windowWidth/2, width: windowWidth/2}}
          />
        </View>
      ):<></>}
      {locationPermission === true ? (
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <SafeAreaView style={{backgroundColor: Colors.lighter, flex: 1}}>
                <StatusBar
                  barStyle={'light-content'}
                  backgroundColor={Colors.lighter}
                  translucent={false}
                  // hidden
                />
                <Tabs.Navigator
                  // default configuration from React Navigation
                  tabBarOptions={{
                    activeTintColor: '#1E90FF',
                    // activeTintColor: "#c",
                    inactiveTintColor: '#222222',
                    tabStyle: {backgroundColor: Colors.light},
                    activeBackgroundColor: Colors.lighter,
                  }}>
                  <Tabs.Screen
                    name="Search"
                    component={StackScreen_Search}
                    options={{
                      tabBarIcon: ({focused, color, size}) => (
                        <Ionicons
                          name="search"
                          size={size ? size : 24}
                          color={focused ? color : '#222222'}
                          focused={focused}

                        />
                      ),
                    }}
                  />
                  <Tabs.Screen
                    name="Explore"
                    component={StackScreen_Explore}
                    options={{
                      tabBarIcon: ({focused, color, size}) => (
                        <MaterialCommunityIcons
                          name="web"
                          size={size ? size : 24}
                          color={focused ? color : '#222222'}
                          focused={focused}

                        />
                      ),
                    }}
                  />
                  <Tabs.Screen
                    name="Trips"
                    component={TripScreen}
                    options={{
                      tabBarIcon: ({focused, color, size}) => (
                        <MaterialCommunityIcons
                          name="book"
                          size={size ? size : 24}
                          color={focused ? color : '#222222'}
                          focused={focused}
                       
                        />
                      ),
                    }}
                  />
                  <Tabs.Screen
                    name="Profile"
                    component={AccountScreen}
                    options={{
                      tabBarIcon: ({focused, color, size}) => (
                        <MaterialCommunityIcons
                          name="account"
                          size={size ? size : 24}
                          color={focused ? color : '#222222'}
                          focused={focused}
                        
                        />
                      ),
                    }}
                  />
                </Tabs.Navigator>
              </SafeAreaView>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      ) : locationPermission === false ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('./assets/icon/location_denied.jpg')}
            resizeMode="contain"
            style={{
              height: windowHeight / 2,
              width: windowWidth,
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
            }}>
            Location permission denied!
          </Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
