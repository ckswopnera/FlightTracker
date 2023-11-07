import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'

export default class AccountScreen extends Component {
  render() {
    return (
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text style={{color:'#000'}}>Account</Text>
      </ScrollView>
    )
  }
}