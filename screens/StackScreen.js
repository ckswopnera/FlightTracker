import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import EmergencyScreen from './EmergencyScreen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import WebViewScreen from './WebViewScreen';
import BottomSheetVIew from '../components/BottomSheetVIew';
import TourismScreen from './TourismScreen';

const Stack = createStackNavigator();
export default function StackScreen() {
  const [isVisibleDiameter, setIsVisibleDiameter] = useState(false);
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Place Search"
        component={WebViewScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tourism"
        component={TourismScreen}
        options={({navigation}) => ({
          headerRightContainerStyle: {paddingRight: 8},
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({ isVisibleLayers: true });
              }}>
              <LinearGradient
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
              locations={[0,0.8]}
                colors={['#5B7FFF', '#33CCFC']}
                style={{
                  // flex: 1,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  // width: 100,
                  // height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    // fontFamily: 'Gill Sans',
                    textAlign: 'center',
                    marginVertical: 4,
                    marginHorizontal: 5,

                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}>
                  Layers
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="BottomSheetVIew"
        component={BottomSheetVIew}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={({navigation}) => ({
          headerRightContainerStyle: {paddingRight: 8},
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({ isVisibleDiameter: true });
              }}>
              <LinearGradient
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
              locations={[0,0.8]}
                colors={['#5B7FFF', '#33CCFC']}
                style={{
                  // flex: 1,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  // width: 100,
                  // height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Gill Sans',
                    textAlign: 'center',
                    marginVertical: 4,
                    marginHorizontal: 5,

                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}>
                  Range
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
