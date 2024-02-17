import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../SearchScreen';
import EmergencyScreen from '../EmergencyScreen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import WebViewScreen from '../WebViewScreen';
import BottomSheetVIew from '../../components/BottomSheetVIew';
import TourismScreen from '../TourismScreen';
import ExploreScreen from '../ExploreScreen';
import {airportCheck} from '../../util/functions';
import {colors} from '../../util/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
export default function StackScreen_Explore() {
  const [isVisibleDiameter, setIsVisibleDiameter] = useState(false);
  const navigation = useNavigation();
  const [airportData, setairportData] = useState([]);
  // useEffect(() => {
  //   airportCheck().then((e)=>{console.log({e});setairportData(e)})
  // }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          headerShown: true,
          title:
            airportData.length === 0
              ? `Exploring from`
              : `Exploring from ${airportData[0]?.iata}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#000',fontSize:16},
          headerRightContainerStyle: {paddingRight: 8},

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('pressed alert!');
                // navigation.setParams({ isVisibleLayers: true });
              }}>
               <Ionicons
                      name="search"
                      size={24}
                      color="#000"
                    />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen
        name="Place Search"
        component={WebViewScreen}
        // options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Tourism"
        component={TourismScreen}
        options={{headerShown: false}}

      />

    </Stack.Navigator>
  );
}
