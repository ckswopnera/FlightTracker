import React, {Component, useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AnimatedG = Animated.createAnimatedComponent(LinearGradient);
const Animated_loader = props => {
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-windowWidth, windowWidth],
  });
  return (
    <View
      style={{
        backgroundColor: 'rgba(38, 38, 38,0.8)',
        borderColor: 'rgba(255, 255, 255,0.6)',
        // borderWidth: 0.2,
        height: 4,
        width: windowWidth,
      }}>
      <AnimatedG
        // colors={['#5B7FFF', '#33CCFC']}
        colors={['#6889FF', '#C668FF']}
        // colors={['#FF6868', '#FF68DE']}
        // colors={['#FDC639', '#FF7C60']}
        // colors={['#403F44', '#1E1B32']}
        // colors={['#FF9E68', '#FF68DE']}
        // colors={['#45C270', '#21CDC3']}


        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateX: translateX}],
        }}
      />
    </View>
  );
};
export default Animated_loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
