import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar, defaultStyle} from 'react-native-calendars';

const XDate = require('xdate');

export default class DateRangePicker extends Component {
  state = {isFromDatePicked: false, isToDatePicked: false, markedDates: {}};

  componentDidMount() {
    this.setupInitialRange();
  }

  onDayPress = day => {
    if (
      !this.state.isFromDatePicked ||
      (this.state.isFromDatePicked && this.state.isToDatePicked)
    ) {
      this.setupStartMarker(day);
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates};
      let [mMarkedDates, range] = this.setupMarkedDates(
        this.state.fromDate,
        day.dateString,
        markedDates,
      );
      if (range >= 0) {
        this.setState({
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
        });
        this.props.onSuccess(this.state.fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
      }
    }
  };

  setupStartMarker = day => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates,
    });
  };

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: this.props.theme.markColor,
            textColor: this.props.theme.markTextColor,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  setupInitialRange = () => {
    // console.log(this.props.initialRange.length)
    if (!this.props.initialRange) return;
    let [fromDate, toDate] = this.props.initialRange;
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    let [mMarkedDates, range] = this.setupMarkedDates(
      fromDate,
      toDate,
      markedDates,
    );
    this.setState({markedDates: mMarkedDates, fromDate: fromDate});
  };

  render() {
    return (
      <>
       {/* <Calendar {...this.props}
                markingType={'period'}
                current={this.state.fromDate}
                 markedDates={this.state.markedDates}
                 onDayPress={(day) => {this.onDayPress(day)}}/> */}
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {[...Array(12)].map((_, index) => {
            const currentMonth = new Date();
            currentMonth.setMonth(currentMonth.getMonth() + index);
            return (
              <View key={index} style={styles.calendarContainer}>
                <Calendar
                  {...this.props}
                  style={styles.calendar}
                  markingType={'period'}
                  current={`${currentMonth.getFullYear()}-${
                    currentMonth.getMonth() + 1 < 10 ? '0' : ''
                  }${currentMonth.getMonth() + 1}-01`}
                  markedDates={this.state.markedDates}
                  onDayPress={day => {
                    this.onDayPress(day);
                  }}
                  // hideArrows
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      </>
    );
  }
}

DateRangePicker.defaultProps = {
  theme: {markColor: '#00adf5', markTextColor: '#ffffff'},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  calendar: {
    marginTop: 20,
  },
  selectedDatesContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  selectedDatesText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  selectedDate: {
    marginBottom: 3,
    color: '#333',
  },
});
