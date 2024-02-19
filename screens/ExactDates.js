import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateRangePicker from './DateRangePicker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AirbnbCalender from './AirbnbCalender';
import {getDateAfterGivenDays} from '../util/functions';

export default function ExactDates() {
  const startDate = new Date();
  const endDate = new Date();
  const days = 10;
  const day_calender=365;
  const getDate = startDate.toISOString().split('T')[0];
  const getDate_after_thirty_days = endDate.setDate(endDate.getDate() + 10);

  const [futureDateRange, setfutureDateRange] = useState(getDateAfterGivenDays(days))
  const [futureCalender, setfutureCalender] = useState(getDateAfterGivenDays(day_calender))


  //   const getDateAfterGivenDays=()=>{
  //     var time = new Date();
  //     var days = parseInt(day);

  //     time.setDate(time.getDate()+ days);

  //     var strdate = time.toISOString().split('T')[0]
  // // console.log(strdate)
  // return strdate

  //   }
  // const currentDate=getDate?.split('T')[0];
  useEffect(() => {
    //     console.log(getDate.toISOString())
    //   // console.log(`${currentMonth.getFullYear()}-0${currentMonth.getMonth()+1}-${currentMonth.getDate()}`)
    // console.log(getDate_after_thirty_days.toString('yyyy-MM-dd'))

  }, []);
  return (
    <>
      {/* <DateRangePicker
          initialRange={[getDate,getDate]}
          onSuccess={(s, e) => alert(s + '||' + e)}
          theme={{ markColor: Colors.primary, markTextColor: 'white' }}/> */}

      <AirbnbCalender
        getDate={getDate}
        getDate_after_given_days={futureDateRange}
        getDate_after_given_future_calender={futureCalender}

      />
      
    </>
  );
}
