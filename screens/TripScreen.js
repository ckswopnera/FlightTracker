import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'

export default class TripScreen extends Component {
  render() {
    return (
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text style={{color:'#000'}}>Trip</Text>
      </ScrollView>
    )
  }
}