import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ExactDates = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateRangeSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (date.dateString < selectedStartDate.dateString) {
      setSelectedEndDate(selectedStartDate);
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  const isDateSelected = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return (
      date.dateString >= selectedStartDate.dateString &&
      date.dateString <= selectedEndDate.dateString
    );
  };

  const isStartDate = (date) => {
    if (!selectedStartDate) return false;
    return date.dateString === selectedStartDate.dateString;
  };

  const isEndDate = (date) => {
    if (!selectedEndDate) return false;
    return date.dateString === selectedEndDate.dateString;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
      >
        {/* Render multiple Calendar components */}
        {[...Array(12)].map((_, index) => {
          const currentMonth = new Date();
          currentMonth.setMonth(currentMonth.getMonth() + index);
          return (
            <View key={index} style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                current={`${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1 < 10 ? '0' : ''}${currentMonth.getMonth() + 1}-01`}
                onDayPress={handleDateRangeSelect}
                markedDates={{
                  [selectedStartDate?.dateString]: { startingDay: true, color: 'blue' },
                  [selectedEndDate?.dateString]: { endingDay: true, color: 'blue' },
                  ...getRangeMarkedDates(selectedStartDate, selectedEndDate)
                }}
                hideArrows
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.selectedDatesContainer}>
        <Text style={styles.selectedDatesText}>Selected Range:</Text>
        <Text style={styles.selectedDate}>
          {selectedStartDate ? `Start: ${selectedStartDate.dateString}` : 'Select start date'}
        </Text>
        <Text style={styles.selectedDate}>
          {selectedEndDate ? `End: ${selectedEndDate.dateString}` : 'Select end date'}
        </Text>
      </View>
    </View>
  );
};

const getRangeMarkedDates = (start, end) => {
  if (!start || !end) return {};
  const markedDates = {};
  let currentDate = new Date(start.dateString);
  while (currentDate <= new Date(end.dateString)) {
    markedDates[currentDate.toISOString().split('T')[0]] = { color: 'blue' }; // Change color here
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return markedDates;
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
  },
  selectedDate: {
    marginBottom: 3,
  },
});

export default ExactDates;
