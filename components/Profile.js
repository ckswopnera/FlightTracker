import * as React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Avatar} from './Avatar';

const Profile = () => {
  const onAvatarChange = image => {
    console.log(image);
    // upload image to server here
  };
  return (
    <>
      <Avatar
        onChange={onAvatarChange}
        source={require('../assets/image/avatar.png')}
      />
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
    flex: 1,
  },
  userRow: {
    alignItems: 'center',
    padding: 15,
    marginTop: 70,
  },
  content: {
    flex: 1,
    backgroundColor: '#d8d8db',
  },
});
