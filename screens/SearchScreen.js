import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FlightScreen from './FlightScreen';
import HotelScreen from './HotelScreen';
import TransportScreen from './TransportScreen';
import Header from '../components/Header';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();
const CustomTabIcon = ({route, focused}) => {
  // console.log(route,focused)
  // Define your custom icons based on the route name
  const getIcon = routeName => {
    switch (routeName) {
      case 'Flight':
        return 'airplane';
      case 'Hotel':
        return 'bed';
      case 'Transport':
        return 'car';
      // Add more cases as needed
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        backgroundColor: focused == true ? 'yellow' : 'rgba(0,0,0,0.8)',
        height: 55,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 14,
      }}>
      <Ionicons
        name={getIcon(route.name)}
        size={40}
        color={focused === true ? 'rgba(0,0,0,0.8)' : '#fff'}
        style={{
          transform: [{rotateZ: route.name === 'Flight' ? '-45deg' : '0deg'}],
        }}
      />
    </View>
  );
};

export default function SearchScreen() {
  return (
    <View style={{flex:1}}>
      {/* <View style={styles.header}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 22,
                fontWeight: 'bold',
                color: '#000',
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 4,
              }}>
              Hey there
            </Text>
            <Text
              style={[
                {
                  textAlign: 'left',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 4,
                },
                {
                  fontSize: 14,
                  fontWeight: '500',
                  paddingHorizontal: 10,
                  paddingTop: 2,
                  color: '#222222',
                },
              ]}>
              Welcome to Flighttrack
            </Text>
          </View> */}
   <Header/>
         <Tab.Navigator
          initialRouteName="Flight"
          screenOptions={({route}) => {
            // console.log(route);
            return {
              tabBarIcon: ({focused}) => (
                <CustomTabIcon route={route} focused={focused} />
              ),
              tabBarShowIcon: true,
              tabBarShowLabel: false,
              swipeEnabled: false,
              // tabBarScrollEnabled:false,
              inactiveTintColor: '#ffffff',
              activeTintColor: '#ffffff',
              tabBarStyle: {backgroundColor: '#f3f3f3', height: 76},
              tabBarIconStyle: {
                height: 55,
                width: 55,
                // backgroundColor:'red',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 14,
              },
              tabBarIndicatorStyle: {
                backgroundColor: 'transparent',
              },
            };
          }}>
          <Tab.Screen
            name="Flight"
            component={FlightScreen}
            // options={{
            //   tabBarIcon: ({focused}) => (
            //     <Ionicons
            //       name="airplane"
            //       size={40}
            //       color={focused==true?"#000":'#fff'}
            //       style={{
            //         transform: [{rotateZ: '-45deg'}],
            //         height: 30,
            //         justifyContent: 'center',
            //         alignContent: 'center',
            //       }}
            //     />
            //   ),
            // }}
          />
          <Tab.Screen name="Hotel" component={HotelScreen} />
          <Tab.Screen name="Transport" component={TransportScreen} />
        </Tab.Navigator>
        </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f3f3f3',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  scrollContainer: {
    padding: 16,
  },
});

