import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {API_KEY} from '@env';
import { url } from './util/url';
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions // optional
} from 'react-native-animated-nav-tab-bar'
import HomeScreen from './screens/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ExploreScreen from './screens/ExploreScreen';
import TripScreen from './screens/TripScreen';
import AccountScreen from './screens/AccountScreen';

function App() {
  const Tabs = AnimatedTabBarNavigator();
  // const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&departure_iata=CCU`;

  const flightApi = async () => {
    try {
      const response = await fetch(url+'&departure_iata=CCU');
      const result = await response.json();
      console.log('data', result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log({API_KEY});
    console.log('url',url+'&departure_iata=CCU');

    // flightApi()
  }, []);
  return (
    <NavigationContainer>
    <SafeAreaView style={{backgroundColor: Colors.lighter,flex:1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor= {Colors.lighter}
        translucent={false}
        // hidden
      />
      <Tabs.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "#1E90FF",
      // activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222",
      tabStyle :{backgroundColor:Colors.light},
      activeBackgroundColor:Colors.lighter
    }}

  >

    <Tabs.Screen name="Search" component={HomeScreen}  options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
                name="search"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>
    <Tabs.Screen name="Explore" component={ExploreScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
                name="web"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }} />
    <Tabs.Screen name="Trips" component={TripScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
                name="book"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>
       <Tabs.Screen name="Profile" component={AccountScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
                name="account"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}/>



  </Tabs.Navigator>
    </SafeAreaView>
    </NavigationContainer>
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
