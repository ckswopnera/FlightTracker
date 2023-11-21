import React, {Component} from 'react';

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {View, StyleSheet, Animated} from 'react-native';

const numColumns = 1;
const size = (windowWidth - 20) / numColumns;

export default class Skeleton extends React.PureComponent {
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
          flex: 1,
          backgroundColor: 'rgba(38, 38, 38,0.2)',
          paddingTop: 24,
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',
                marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                marginVertical:2,
                width: '70%',
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',
                marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',
                marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
             width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
             width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',
                marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
          </View>
        </View>
        <View style={[{marginBottom: 8}, styles.card]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(38, 38, 38,0.4)',
              overflow: 'hidden',
              marginRight: 16,
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
              flex: 1,
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '100%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </Animated.View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '70%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(38, 38, 38,0.4)',
                height: 10,
                width: '40%',marginVertical:2,
              }}>
              <Animated.View
                style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: 'white',
                  opacity: 0.5,
                  transform: [{translateX: translateX2}],
                }}></Animated.View>
            </View>
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
    padding: 16,
    shadowColor: 'black',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
});
