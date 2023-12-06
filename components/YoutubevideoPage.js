import {View, Text, Button} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Alert} from 'react-native';
const YoutubevideoPage = () => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef();

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View style={{paddingVertical: 10, marginHorizontal: 8}}>
      <YoutubePlayer
        ref={playerRef}
        height={300}
        width={'100%'}
        // play={playing}

        // onChangeState={onStateChange}

        // videoId={"b6PimS7dtW8"}
        playList={['b6PimS7dtW8', '4jW9wk_g9QY', '31p9_4fu9mw', 'Zco3XlYt6Ko']}
        // playList={'PLexmhDHOGHQTUDytEOMlYIrKYHzSzngBO'}
        playListStartIndex={0}
        webViewProps={{
          androidLayerType: 'hardware',
        }}
      />
      {/* <Button
        title="Press"
        onPress={() => {
          playerRef.current
            ?.getCurrentTime()
            .then(currentTime => console.log({currentTime}));

          playerRef.current
            ?.getDuration()
            .then(getDuration => console.log({getDuration}));
           
        }}
      /> */}
    </View>
  );
};

export default YoutubevideoPage;
