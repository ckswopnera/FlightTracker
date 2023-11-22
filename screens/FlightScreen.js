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
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native';

const imageLinks = [
  {src: require('../assets/image/world-map.png'), title: 'img1'},
  {src: require('../assets/image/world-map.png'), title: 'img2'},
  {src: require('../assets/image/world-map.png'), title: 'img3'},
  {src: require('../assets/image/world-map.png'), title: 'img4'},
  {src: require('../assets/image/world-map.png'), title: 'img5'},
];
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function FlightScreen() {
  return (
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
          source={require('../assets/image/world-map.png')}
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
            paddingBottom: 40,
          }}>
          {imageLinks.map((item, index) => {
            //   console.log({item})

            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'column',
                  height: 100,
                  width: 100,
                  backgroundColor: 'transparent',
                  margin: 4,
                }}>
                <Image
                  source={item.src}
                  style={{height: 100, width: 100, borderRadius: 8}}
                  resizeMode="contain"
                />
                <Text style={{color: '#000', textAlign: 'center'}}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <Text style={{color: '#000', paddingVertical: 10}}>
          See the world on your budget
        </Text>
      </View>
    </ScrollView>
  );
}
