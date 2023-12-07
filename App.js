import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
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
import ExploreScreen from './screens/ExploreScreen';
import TripScreen from './screens/TripScreen';
import AccountScreen from './screens/AccountScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import StackScreen from './screens/StackScreen';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
function App() {
  const [city, setcity] = useState();
  const Tabs = AnimatedTabBarNavigator();
  const lat = 22.639416535722226;
  const long = 88.34107229852647;
  const radius_airport = 50000;

  const apiUrl = 'https://overpass-api.de/api/interpreter';

  const airportCheck = async () => {
    // Overpass query to get information about airports
    const overpassQuery = `
[out:json];
(
  node["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
  way["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
  relation["aeroway"="aerodrome"]["iata"](around:${radius_airport},${lat},${long});
);
out center;
`;

    // Construct the full Overpass API URL with the query
    const overpassUrl = `${apiUrl}?data=${encodeURIComponent(overpassQuery)}`;

    // Use the fetch API to make the request
    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        // Process the data as needed
        // console.log(data);
        const airportdata = data.elements.map((item, index) => item.tags);
        console.log({airportdata});
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const flightApi = async () => {
    try {
      const response = await fetch(aviation_url + '&departure_iata=CCU');
      const result = await response.json();
      console.log('data', result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log('url', aviation_url + '&departure_iata=CCU');
    // airportCheck();
    // flightApi()
  }, []);
  return (
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
                // activeTintColor: "#2F7C6E",
                inactiveTintColor: '#222222',
                tabStyle: {backgroundColor: Colors.light},
                activeBackgroundColor: Colors.lighter,
              }}>
              <Tabs.Screen
                name="Search"
                component={StackScreen}
                options={{
                  tabBarIcon: ({focused, color, size}) => (
                    <Ionicons
                      name="search"
                      size={size ? size : 24}
                      color={focused ? color : '#222222'}
                      focused={focused}
                      color={color}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                  tabBarIcon: ({focused, color, size}) => (
                    <MaterialCommunityIcons
                      name="web"
                      size={size ? size : 24}
                      color={focused ? color : '#222222'}
                      focused={focused}
                      color={color}
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
                      color={color}
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
                      color={color}
                    />
                  ),
                }}
              />
            </Tabs.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
