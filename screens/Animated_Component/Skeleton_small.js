import React, {Component} from 'react';

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {View, StyleSheet, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const numColumns = 1;
const size = (windowWidth - 20) / numColumns;

export default class Skeleton_small extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLoading: true,
      cartData: 1,
      imageUrl: [],
    };
    this.circleAnimatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.circleAnimated();
  }

  circleAnimated = () => {
    this.circleAnimatedValue.setValue(0);
    Animated.timing(this.circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.circleAnimated();
      }, 500);
    });
  };

  render() {
    // console.log("data details:", this.state.data);
    const translateX = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 100],
    });

    const translateX2 = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 200],
    });
    return (
      <View
        style={{
          //   flex: 1,
          width: '100%',
          backgroundColor: '#f3f3f3',
          //   paddingVertical: 4,
          //   paddingHorizontal: 6,
        }}>
        <View style={styles.card}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 12,
            }}>
            <Animated.View
              style={{
                width: '30%',
                opacity: 0.5,
                height: '100%',
                backgroundColor: 'white',
                transform: [{translateX: translateX}],
              }}></Animated.View>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 12,
            }}>
            <Animated.View
              style={{
                width: '30%',
                opacity: 0.5,
                height: '100%',
                backgroundColor: 'white',
                transform: [{translateX: translateX}],
              }}></Animated.View>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 12,
            }}>
            <Animated.View
              style={{
                width: '30%',
                opacity: 0.5,
                height: '100%',
                backgroundColor: 'white',
                transform: [{translateX: translateX}],
              }}></Animated.View>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 12,
            }}>
            <Animated.View
              style={{
                width: '30%',
                opacity: 0.5,
                height: '100%',
                backgroundColor: 'white',
                transform: [{translateX: translateX}],
              }}></Animated.View>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 12,
            }}>
            <Animated.View
              style={{
                width: '30%',
                opacity: 0.5,
                height: '100%',
                backgroundColor: 'white',
                transform: [{translateX: translateX}],
              }}></Animated.View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
    // marginBottom: 1,
    backgroundColor: '#f5f8fa',
    // marginBottom:10,
    paddingBottom: 30,
  },
  container1: {
    backgroundColor: '#f3f3f3',
    // marginBottom:30
    // paddingBottom:5
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginBottom:5
  },
  itemOrderID: {
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16.0,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemOrderDate: {
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 14.0,
    marginBottom: 5,
  },
  itemOrderAmount: {
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 14.0,
    marginBottom: 5,
  },
  itemOrderStatus: {
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 14.0,
  },
  vieworderbtnstyle: {
    height: 40,
    color: '#000000',
    backgroundColor: 'white',
    // fontSize: 30,
    // fontWeight: "bold",
    // textAlignVertical: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(38, 38, 38,0.5)',
    // flex: 1,
    borderRadius: 8,
    padding: 5,
    // backgroundColor: "green",
  },
  card: {
    padding: 6,
    shadowColor: 'black',
    borderRadius: 4,
    backgroundColor: '#f3f3f3',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
});
