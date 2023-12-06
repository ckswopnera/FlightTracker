import {configureStore} from '@reduxjs/toolkit';
import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import App from '../App';

export default function Start() {
  // console.log({store})
  return (
    // <Provider store={store}>
      <App />
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
