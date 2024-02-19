import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {StyleSheet} from 'react-native';
import {
  getRangeMonthFutureInSort,
  getRangeMonthInSort,
  monthNames2,
} from '../util/functions';

export default function DateRange() {
  const [scrollEnabled, setscrollEnabled] = useState();
  const [valuesRange, setvaluesRange] = useState([new Date().getMonth(), 12]);
  const enableScroll = () => setscrollEnabled(true);
  const disableScroll = () => setscrollEnabled(false);
  const [currentDate, setcurrentDate] = useState(
    getRangeMonthInSort(new Date()),
  );
  const [futureDate, setfutureDate] = useState(
    getRangeMonthFutureInSort(new Date()),
  );
  const [startMonth, setstartMonth] = useState(null);
  const [endMonth, setendMonth] = useState(null);

  useEffect(() => {
    console.log({currentDate}, {futureDate});
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
      }}>
      <Text style={styles.sliderText}>
        {startMonth !== null ? startMonth : currentDate}
      </Text>
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MultiSlider
          sliderLength={280}
          values={valuesRange}
          enableLabel={false}
          // showStepLabels={true}
          // showStepMarkers={true}
          // showSteps={true}
          min={valuesRange[0]}
          max={valuesRange[1]}
          step={1}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
          onValuesChange={e => {
            console.log({e});
            setvaluesRange(e);
            console.log(monthNames2(e[0]));
            setstartMonth(monthNames2(e[0]));
            setendMonth(monthNames2(e[1]));
          }}
        />
      </ScrollView>
      <Text style={styles.sliderText}>
        {endMonth!==null && valuesRange[1]!==12?endMonth:futureDate}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  sliderText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign:'center'
  },
});
