import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageProps,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {CameraIcon, ImageIcon} from './icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const Avatar = props => {
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '15%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [uri, setUri] = useState(props.source?.uri || undefined);
  const chooseImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .catch(err => console.log({err}));
  };

  const openCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .catch(err => console.log({err}));
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={{
          borderRadius: 155,
          backgroundColor: 'rgba(0,0,0,0.4)',
          height: 155,
          width: 155,
          // padding: 10,
          flexDirection: 'row',
        }}>
        <Image
          style={styles.avatar}
          {...props}
          source={uri ? {uri} : props?.source}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            height: 35,
            width: 35,
            backgroundColor: 'rgba(255,255,255,1)',
            borderRadius: 35,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <MaterialCommunityIcons
            name="camera"
            size={28}
            color="#000"
            style={{alignItems: 'center', justifyContent: 'center', padding: 2}}
          />
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: Colors.light,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginHorizontal: 4,
        }}>
        <View style={styles.options}>
          <Pressable style={styles.option} onPress={chooseImage}>
            <Ionicons
              name="images-sharp"
              size={28}
              color="#000"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
              }}
            />
            <Text style={{color: '#000'}}>Library </Text>
          </Pressable>
          <Pressable style={styles.option} onPress={openCamera}>
            <MaterialCommunityIcons
              name="camera"
              size={28}
              color="#000"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
              }}
            />
            <Text style={{color: '#000'}}>Camera</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 150,
    resizeMode: 'contain',
  },

  options: {
    flexDirection: 'row',

    marginHorizontal: 6,
    padding: 20,
  },
  option: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
