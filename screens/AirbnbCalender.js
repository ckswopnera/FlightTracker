import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Calendar from 'react-native-calendar-select';
import {Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSelectedDatesInShort} from '../util/functions';

export default class AirbnbCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.getDate,
      endDate: null,
      getStartDateInStringSort: '',
      getEndDateInStringSort: '',
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }
  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate({startDate, endDate, startMoment, endMoment}) {
    const testDateStart = getSelectedDatesInShort(startDate);
    const testDateEnd = getSelectedDatesInShort(endDate);

    this.setState({
      startDate,
      endDate,
      getStartDateInStringSort: testDateStart,
      getEndDateInStringSort: testDateEnd,
    });

    console.log({startDate}, {endDate});

    console.log({testDateStart});
    // console.log('getStartDateInStringSort',this.state.getStartDateInStringSort);
  }
  openCalendar() {
    this.calendar && this.calendar.open();
  }
  render() {
    console.log(this.props);
    // It's an optional property, I use this to show the structure of customI18n object.
    let customI18n = {
      w: ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      weekday: [
        '',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      text: {
        start: 'Check in',
        end: 'Check out',
        date: 'Date',
        save: 'Confirm',
        clear: 'Reset',
      },
      date: 'DD / MM / yy', // date format
    };
    // optional property, too.
    let color = {
      subColor: '#fff',
      mainColor: Colors.primary,
      borderColor: '#fff',
    };
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={this.openCalendar}
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.2,
            // borderRadius: 6,
            borderColor: 'rgba(0,0,0,0.1)',
            marginTop: 16,
            flexDirection: 'row',
          }}>
          <Ionicons name="calendar" size={20} />
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              fontWeight: 'bold',
              fontSize: 16,
              color: '#666',
            }}>
            {this.state.getStartDateInStringSort.length === 0
              ? 'Use exact dates'
              : this.state.getStartDateInStringSort}
            {this.state.getEndDateInStringSort.length === 0
              ? ''
              : ' - ' + this.state.getEndDateInStringSort}
          </Text>
        </TouchableOpacity>
        <Calendar
          i18n="en"
          ref={calendar => {
            this.calendar = calendar;
          }}
          customI18n={customI18n}
          color={color}
          format="YYYYMMDD"
          minDate={this.props.getDate}
          maxDate={this.props.getDate_after_given_future_calender}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
        />
      </View>
    );
  }
}
