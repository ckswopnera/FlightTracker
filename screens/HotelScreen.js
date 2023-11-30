import { View, Text } from 'react-native'
import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';

export default function HotelScreen() {
  return (
    <View>
      <Text style={{color:'#000',fontSize:18}}>HotelScreen</Text>
      <YoutubePlayer
                  height={300}
                  width={'100%'}
                  // play={playing}

                  // onChangeState={onStateChange}

                  // videoId={"b6PimS7dtW8"}
                  playList={['b6PimS7dtW8', '4jW9wk_g9QY','31p9_4fu9mw','Zco3XlYt6Ko']}
                  // playList={'PLexmhDHOGHQTUDytEOMlYIrKYHzSzngBO'}
                  playListStartIndex={0}
                  webViewProps={{
                    androidLayerType: 'hardware',
                }}
                />
    </View>
  )
}