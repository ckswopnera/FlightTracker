import React, {Component, useEffect, useState} from 'react';

import {
  ScrollView,
  Text,
  TextInput,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {
  DARK_THEME,
  TranslationLanguageCodeList,
  getAllCountries,
} from 'react-native-country-picker-modal';
import Geolocation from '@react-native-community/geolocation';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import {colors} from '../util/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OPENCAGE_API_KEY, YAHOO_API_KEY} from '@env';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function AccountScreen() {
  const [Address, setAddress] = useState();
  const [YahooAddress, setYahooAddress] = useState();

  const [allfieldValues, setallfieldValues] = useState();
  const [isvisible, setIsvisible] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [country, setCountry] = useState();
  const [countryDetails, setCountryDetails] = useState(null);

  const requiredSchema = Yup.string().required('*required');
  const min2Schema = Yup.string().min(2, 'Seems a bit short...');
  const nameRegExp =
    /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  const pincodeRegExp = /^[0-9]*$/;

  const getCurrentAddress = async () => {
    setIsloading(true);
    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        // Make a request to the Nominatim API for reverse geocoding
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        )
          .then(response => response.json())
          .then(data => {
            // console.log('City_data', data);
            setAddress(data);
            // Extract city and country information from the response
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.hamlet;
            const country = data.address.country;
            const country_code = data.address.country_code.toUpperCase();

            // console.log({city});

            fetchData(country_code);
            setIsloading(false);
          })

          .catch(error => {
            // Handle errors
            console.error('Error:', error);
          });
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const getCurrentAddress_hereMap = async () => {
    setIsloading(true);

    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        // Make a request to the Nominatim API for reverse geocoding
        fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${YAHOO_API_KEY}`,
        )
          .then(response => response.json())
          .then(data => {
            const address = data.items.map((i, l) => i.address);
            const address123 = data.items.map((i, l) => i.address);

            // console.log('Yahoo_City_data', address[0]);

            console.log('Yahoo_City_data', address123);
            setYahooAddress(address[0]);
            setIsloading(false);
          })

          .catch(error => {
            // Handle errors
            console.error('Error:', error);
          });
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const fetchData = async country_code => {
    try {
      const countries = await getAllCountries();

      const country = countries.find(c => c.cca2 === country_code);
      if (country) {
        console.log('Country Details:', country);
        setCountryDetails(country);
      } else {
        console.log('Country not found');
      }
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  useEffect(() => {
    // fetchData();
    getCurrentAddress();
    getCurrentAddress_hereMap();
  }, []);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {isLoading && <ActivityIndicator size={'large'} />}
      <Formik
        initialValues={{
          name: '',
          email: '',
          // password: '',
          country: '',
          country_code: countryDetails?.cca2,
          card: false,
          address: YahooAddress?.label || '',
          address2: '',
          city: YahooAddress?.city || '',
          pincode: YahooAddress?.postalCode || '',
          // state: Address?.address?.state || '',
          state: YahooAddress?.state || '',

          phonenumber: '',
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .matches(nameRegExp, '*no special character')
            .min(2, '*at least 2 characters')
            .concat(requiredSchema),
          address: Yup.string().concat(requiredSchema),
          address2: Yup.string().notRequired('*address is optional'),
          city: Yup.string().concat(requiredSchema),
          pincode: Yup.string()
            .matches(pincodeRegExp, '*no special character')
            .min(6, '*at least 6 characters')
            .max(9, '*too long')
            .concat(requiredSchema),
          state: Yup.string().concat(requiredSchema),
          email: Yup.string().email('Invalid email').concat(requiredSchema),
          phonenumber: Yup.string()
            .phone(
              country?.cca2 === undefined
                ? countryDetails?.cca2
                : country?.cca2,
              country?.cca2 === undefined
                ? `*is invalid for ${countryDetails?.cca2}`
                : `*is invalid for ${country?.cca2}`,
            )
            .concat(requiredSchema),
          // password: Yup.string().min(6, 'Password must be at least 6 characters'.concat(requiredSchema),
          country: Yup.string().concat(requiredSchema),
          country_code: Yup.string().notRequired('*not required'),
        })}
        onSubmit={values => {
          // Handle form submission here
          console.log('Form data submitted:', values);
          setallfieldValues({
            address: values?.address,
            address2: values?.address2,
            card: values?.card,
            city: values?.city,
            email: values?.email,
            name: values?.name,
            phonenumber: `${country?.callingCode + values?.phonenumber}`,
            pincode: values?.pincode,
            state: values?.state,
            country_code: values.country_code,
          });

          console.log({allfieldValues});
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View
              style={{
                width: windowWidth - 8,
                marginHorizontal: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: windowWidth - 8,
                  justifyContent: 'flex-start',
                  padding: 4,
                  marginTop: 6,
                }}>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.6)',
                  }}>
                  Account information
                </Text>
              </View>
              <View
                style={{
                  width: windowWidth - 8,
                  marginVertical: 6,
                  borderColor: 'grey',
                  borderRadius: 8,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <TextInput
                    placeholder="Full Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholderTextColor={colors.light_textColor}
                    cursorColor={'#000'}
                    style={{
                      color: colors.light_textColor,

                      width: '100%',
                      paddingStart: 14,
                    }}
                  />
                  {touched.name && errors.name && (
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 15,
                        right: 0,
                      }}>
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderColor: 'grey',

                    borderTopWidth: 1,
                  }}>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholderTextColor={colors.light_textColor}
                    keyboardType="email-address"
                    cursorColor={'#000'}
                    style={{
                      color: colors.light_textColor,

                      width: '100%',
                      paddingStart: 14,
                    }}
                  />
                  {touched.email && errors.email && (
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 15,
                        right: 0,
                      }}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderColor: 'grey',

                    borderTopWidth: 1,
                  }}>
                  <TextInput
                    placeholder="Address line 1"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholderTextColor={colors.light_textColor}
                    cursorColor={'#000'}
                    style={{
                      color: colors.light_textColor,
                      width: '100%',
                      paddingStart: 14,
                    }}
                  />
                  {touched.address && errors.address && (
                    <Text
                      style={{
                        color: 'red',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 15,
                        right: 0,
                      }}>
                      {errors.address}
                    </Text>
                  )}
                </View>
                <TextInput
                  placeholder="Address line 2"
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                  value={values.address2}
                  placeholderTextColor={colors.light_textColor}
                  cursorColor={'#000'}
                  style={{
                    color: colors.light_textColor,
                    borderColor: 'grey',

                    borderTopWidth: 1,
                    width: '100%',
                    paddingStart: 14,
                  }}
                />
                {touched.address2 && errors.address2 && (
                  <Text
                    style={{
                      color: 'red',
                      position: 'absolute',
                      bottom: 15,
                      right: 0,
                    }}>
                    {errors.address2}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: 'grey',
                  }}>
                  <View
                    style={{
                      borderRightWidth: 1,
                      width: '50%',
                      borderColor: 'grey',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholder="City"
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                      placeholderTextColor={colors.light_textColor}
                      cursorColor={'#000'}
                      style={{
                        color: colors.light_textColor,
                        paddingStart: 14,
                        width: '100%',
                      }}
                    />
                    {touched.city && errors.city && (
                      <Text
                        style={{
                          color: 'red',
                          textAlign: 'center',
                          position: 'absolute',
                          bottom: 15,
                          right: 0,
                        }}>
                        {errors.city}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholder="Pin Code"
                      onChangeText={handleChange('pincode')}
                      placeholderTextColor={colors.light_textColor}
                      maxLength={9}
                      keyboardType="number-pad"
                      onBlur={handleBlur('pincode')}
                      value={values.pincode}
                      cursorColor={'#000'}
                      style={{
                        color: colors.light_textColor,
                        paddingStart: 14,
                        width: '100%',
                      }}
                    />
                    {touched.pincode && errors.pincode && (
                      <Text
                        style={{
                          color: 'red',
                          textAlign: 'center',
                          position: 'absolute',
                          bottom: 15,
                          right: 0,
                        }}>
                        {errors.pincode}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 60,
                    borderColor: 'grey',
                    borderTopWidth: 1,
                    alignItems: 'center',
                    paddingVertical: 2,
                    // justifyContent:'flex-start'
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '60%',
                      height: 60,
                      borderColor: 'grey',
                      borderRightWidth: 1,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'rgba(0,0,0,0.6)',
                          paddingLeft: 10,
                          width: '100%',
                        }}>
                        Country or region
                      </Text>
                      {touched.country && errors.country && (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                          }}>
                          {errors.country}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '90%'}}>
                        <CountryPicker
                          containerButtonStyle={{
                            // width: '92%',
                            paddingLeft: 10,
                          }}
                          // placeholder='Select Country
                          visible={isvisible}
                          withCloseButton={true}
                          // theme={null}
                          countryCode={values?.country_code || country?.cca2}
                          withCallingCode
                          withFlag
                          withCountryNameButton
                          withFilter={true}
                          withAlphaFilter={true}
                          onClose={setIsvisible(false)}
                          onSelect={value => {
                            // console.log({value});
                            setCountry({
                              cca2: value?.cca2,
                              callingCode: value?.callingCode[0],
                              countryName: value?.name,
                            });
                            setIsvisible(false);
                            handleChange('country')(value?.name);
                            handleChange('country_code')(value?.cca2);
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        style={{
                          width: '10%',
                        }}
                        onPress={() => {
                          isvisible === false
                            ? setIsvisible(true)
                            : setIsvisible(false);
                        }}>
                        <MaterialCommunityIcons
                          name={isvisible === true ? 'menu-up' : 'menu-down'}
                          size={23}
                          style={{
                            // width: '10%',
                            color: '#000',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '40%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholder="State"
                      onChangeText={handleChange('state')}
                      onBlur={handleBlur('state')}
                      placeholderTextColor={colors.light_textColor}
                      value={values.state}
                      cursorColor={'#000'}
                      style={{
                        color: colors.light_textColor,
                        paddingStart: 14,
                        width: '100%',
                      }}
                    />
                    {touched.state && errors.state && (
                      <Text
                        style={{
                          color: 'red',
                          position: 'absolute',
                          bottom: 15,
                          right: 0,
                        }}>
                        {errors.state}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    borderColor: 'grey',

                    borderTopWidth: 1,
                    flexDirection: 'row',
                    width: '100%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  {country?.callingCode?.length !== undefined && (
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: 'grey',
                        height: '100%',
                        width: '12%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // paddingHorizontal: 2,
                      }}>
                      <Text
                        style={{
                          color: colors.light_textColor,
                          textAlign: 'center',
                        }}>
                        +{country?.callingCode}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '88%',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      // height: 50,
                    }}>
                    <TextInput
                      placeholder="Phone number"
                      onChangeText={handleChange('phonenumber')}
                      placeholderTextColor={colors.light_textColor}
                      onBlur={handleBlur('phonenumber')}
                      value={values.phonenumber}
                      keyboardType="numeric"
                      cursorColor={'#000'}
                      maxLength={15}
                      style={{
                        width: '100%',
                        // alignItems: 'center',
                        // height: 50,
                        paddingStart: 8,
                        textAlign: 'left',
                      }}
                    />

                    {touched.phonenumber && errors.phonenumber && (
                      <Text
                        style={{
                          color: 'red',
                          textAlign: 'right',
                          position: 'absolute',
                          bottom: 15,
                          right: 0,
                        }}>
                        {errors.phonenumber}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 14,
                  borderRadius: 8,
                  width: windowWidth / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margintop: 30,
                }}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}
