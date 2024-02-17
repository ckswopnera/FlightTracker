import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import DateRangePicker from './DateRangePicker'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function ExactDates() {
  const getDate = new Date().toISOString().split('T')[0]
  // const currentDate=getDate?.split('T')[0];
//   useEffect(() => {
//     console.log(getDate.toISOString())
//   // console.log(`${currentMonth.getFullYear()}-0${currentMonth.getMonth()+1}-${currentMonth.getDate()}`)  
// console.log(getDate.toISOString().split('T')[0])
// }, [])
  return (
    <>
      <DateRangePicker
          initialRange={[getDate,getDate]}
          onSuccess={(s, e) => alert(s + '||' + e)}
          theme={{ markColor: Colors.primary, markTextColor: 'white' }}/>
    </>
  )
}
