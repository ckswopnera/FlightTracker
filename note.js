import React from 'react';
import {Text} from 'react-native';
import {
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const Avatar = props => {
  const [uri, setUri] = React.useState(props?.source?.uri || undefined);

  const pickPicture = async () => {
    await ImagePicker.openPicker({
      // multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image?.path);
        props.onChange?.(image);
      })
      .catch(err => console.log({err}));
  };
  return (
    <TouchableOpacity
      onPress={pickPicture}
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
          style={{alignItems: 'center', justifyContent: 'center',padding:2,}}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  avatar: {
    // paddingTop: 20,
    height: 150,
    width: 150,
    borderRadius: 150,
    // padding: 10,
    resizeMode: 'contain',
  },
});
