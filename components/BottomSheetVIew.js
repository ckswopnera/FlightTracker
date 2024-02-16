import {View, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function BottomSheetVIew({params}) {
  const {dismiss, dismissAll} = useBottomSheetModal();

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['70%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  useEffect(() => {
    console.log({val});
  }, [val]);
  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: Colors.light,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginHorizontal: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={val?.src}
          style={{
            height: 300,
            width: windowWidth - 20,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            // padding: 8,
            marginHorizontal: 10,
            position: 'absolute',
            top: 15,
            right: 0,
            left: 0,
          }}
          resizeMode="cover"
        />
      </BottomSheetModal>
    </View>
  );
}
