import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {airportCheck} from '../util/functions';
import {
  maxBudget,
  minBudget,
  picker_for_explore,
  picker_for_explore_Distance,
  picker_for_explore_themes,
} from '../util/pickerData';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {done, explore_cheap_price_tag} from '../util/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExactDates from './ExactDates';
import DateRange from './DateRange';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function ExploreScreen() {
  const Tab = createMaterialTopTabNavigator();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(picker_for_explore);
  const [modalVisible, setModalVisible] = useState(false);
  const progress = useSharedValue(100000);

  const min = useSharedValue(0);
  const max = useSharedValue(150000);

  const progress2 = useSharedValue(24);

  const min2 = useSharedValue(1);
  const max2 = useSharedValue(24);
  const [openView, setopenView] = useState(null);
  const [openViewCheck, setopenViewCheck] = useState(false);
  const [checkboxState, setcheckboxState] = useState(false);
  const [themeCheckData, setthemeCheckData] = useState(null);
  const [distance_slider_value, setdistance_slider_value] = useState(null);
  const [budget_slider_value, setbudget_slider_value] = useState(100000);

  // useEffect(() => {
  //   airportCheck().then((e)=>console.log({e}))
  // })

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          // flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}>
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setopenView(item);
                setopenViewCheck(true);
              }}>
              <View
                key={index}
                style={{
                  width: windowWidth / 4 - 4,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    item?.id === openView?.id ? '#000' : 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  // padding: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: item?.id === openView?.id ? '#fff' : '#000',
                  }}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {openView?.value === 'Budget' && openViewCheck === true ? (
        <View
          style={{
            backgroundColor: '#f2f2f2',
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 2,
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 4,
              color:'#333'
            }}>
            {budget_slider_value}+
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', padding: 2,color:'#333'}}>{minBudget}</Text>
            <Slider
              // step={1.0}
              style={styles.container}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              sliderHeight={3}
              theme={{
                disableMinTrackTintColor: '#fff',
                maximumTrackTintColor: 'rgba(0,0,0,0.2)',
                minimumTrackTintColor: '#222',
                cacheTrackTintColor: '#333',
                bubbleBackgroundColor: '#666',
                heartbeatColor: '#999',
              }}
              onValueChange={e => {
                console.log(Math.floor(e));
                setbudget_slider_value(Math.floor(e));
              }}
            />
            <Text style={{textAlign: 'center', padding: 2,color:'#333'}}>{maxBudget}+</Text>
          </View>
          <TouchableOpacity
            style={{
              width: '98%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderRadius: 6,
              borderColor: '#333',
              marginTop: 16,
            }}
            onPress={() => {
              openViewCheck === false
                ? setopenViewCheck(true)
                : setopenViewCheck(false);
              setopenView(null);
            }}>
            <Text style={{padding: 10, fontWeight: 'bold', fontSize: 16,color:'#666'}}>
              {done}
            </Text>
          </TouchableOpacity>
        </View>
      ) : openView?.value === 'Themes' && openViewCheck === true ? (
        <>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              //      alignItems: 'center',
              // justifyContent: 'center',
              padding: 2,
              width: '100%',
            }}>
            {picker_for_explore_themes?.map((i, j) => {
              return (
                <BouncyCheckbox
                  key={j}
                  style={{marginTop: 16, marginLeft: 4}}
                  textStyle={{
                    textDecorationLine: 'none',
                  }}
                  size={25}
                  isChecked={i?.value === themeCheckData?.value ? true : false}
                  fillColor="#333"
                  unfillColor="rgba(0,0,0,0.2)"
                  text={i?.value}
                  disableBuiltInState
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 2}}
                  // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                  onPress={() => {
                    setthemeCheckData(i);
                    setcheckboxState(!checkboxState);

                    console.log({checkboxState}, {i});
                  }}
                />
              );
            })}

            <TouchableOpacity
              style={{
                width: '98%',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderRadius: 6,
                borderColor: '#333',
                marginTop: 16,
                marginLeft: 4,
              }}
              onPress={() => {
                openViewCheck === false
                  ? setopenViewCheck(true)
                  : setopenViewCheck(false);
                setopenView(null);
              }}>
              <Text style={{padding: 10, fontWeight: 'bold', fontSize: 16,color:'#333'}}>
                {done}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : openView?.value === 'Distance' && openViewCheck === true ? (
        <>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              color: '#000',
              marginTop: 16,
            }}>
            Stops
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 16,
            }}>
            {picker_for_explore_Distance.map((i, j) => {
              return (
                <View
                  key={j}
                  style={{
                    padding: 6,
                    borderWidth: 0.5,
                    borderColor: '#666',
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/icon/arrow-down.png')}
                    style={{
                      height: 20,
                      width: 40,
                      transform: [{rotate: '0deg'}, {scaleX: -1}],
                    }}
                  />

                  {i?.value === '1 stop' ? (
                    <View
                      style={{
                        width: 8,
                        borderRadius: 8,
                        height: 8,
                        position: 'absolute',
                        top: 3,
                        backgroundColor: '#000',
                      }}
                    />
                  ) : i?.value === 'Any' ? (
                    <>
                      <View
                        style={{
                          width: 8,
                          borderRadius: 8,
                          height: 8,
                          position: 'absolute',
                          top: 3,
                          backgroundColor: '#000',
                        }}
                      />
                      <View
                        style={{
                          width: 8,
                          borderRadius: 8,
                          height: 8,
                          position: 'absolute',
                          top: 10,
                          backgroundColor: '#000',
                          left: 33,
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <Text
                    style={{textAlign: 'center', fontSize: 16, color: '#000'}}>
                    {i?.value}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              color: '#000',
              marginTop: 16,
            }}>
            {distance_slider_value === null
              ? 'Any flight duration'
              : `Under ${distance_slider_value} hours`}
          </Text>
          <View
            style={{
              // backgroundColor: '#f2f2f2',
              // height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}>
            <Slider
              // step={24}
              style={{width: '80%', marginTop: 16}}
              progress={progress2}
              minimumValue={min2}
              maximumValue={max2}
              sliderHeight={3}
              theme={{
                disableMinTrackTintColor: '#fff',
                maximumTrackTintColor: 'rgba(0,0,0,0.2)',
                minimumTrackTintColor: '#222',
                cacheTrackTintColor: '#333',
                bubbleBackgroundColor: '#666',
                heartbeatColor: '#999',
              }}
              onValueChange={e => {
                console.log(Math.floor(e));
                setdistance_slider_value(Math.floor(e));
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              width: '98%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderRadius: 6,
              borderColor: '#333',
              marginTop: 16,
              marginLeft: 4,
            }}
            onPress={() => {
              openViewCheck === false
                ? setopenViewCheck(true)
                : setopenViewCheck(false);
              setopenView(null);
            }}>
            <Text style={{padding: 10, fontWeight: 'bold', fontSize: 16,color:'#333'}}>
              {done}
            </Text>
          </TouchableOpacity>
        </>
      ) : openView?.value === 'Dates' && openViewCheck === true ? (
        <Tab.Navigator
          screenOptions={{
            swipeEnabled:false,
            tabBarLabelStyle: { textTransform: 'none' },
          }}
          >
          <Tab.Screen
            options={{tabBarLabel: 'Exact Dates'}}
            name="Exact Dates"
            component={ExactDates}
          />
          <Tab.Screen
            options={{tabBarLabel: 'Date Range'}}
            name="Date Range"
            component={DateRange}
          />
        </Tab.Navigator>
      ) : (
        <></>
      )}
      {openViewCheck === false && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="information-circle" color={'#333'}/>
          <Text style={{padding: 10, fontWeight: '600', textAlign: 'center',color:'#333'}}>
            {explore_cheap_price_tag}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
  },
});
