import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
const Header = props => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        <View style={{flexDirection: 'column'}}></View>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#000',
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 4,
          }}>
          Hey there
        </Text>
        <Text
          style={[
            {
              textAlign: 'left',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000',
              paddingHorizontal: 10,
              paddingTop: 10,
              paddingBottom: 4,
            },
            {
              fontSize: 14,
              fontWeight: '500',
              paddingHorizontal: 10,
              paddingTop: 2,
              color: '#222222',
            },
          ]}>
          Welcome to Flighttrack
        </Text>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 0,
          padding: 10,
        }}
        onPress={() => navigation.navigate('Emergency')}>
        <Image
          source={require('../assets/icon/sos.png')}
          style={{
            height: 30,
            width: 30,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      {/* <MaterialCommunityIcons
        name="alarm-light"
        color="red"
        size={25}
        style={{position: 'absolute', top: 0, right: 0, padding: 10}}
        onPress={() => navigation.navigate('Emergency')}
      /> */}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f3f3f3',
    // flexDirection:'row',
  },
});
