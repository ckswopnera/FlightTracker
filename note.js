import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {ListItem} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheet, Button, Divider, Input} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

export default function EmergencyScreen() {
  const [hospitalData, sethospitalData] = useState();
  const [searchHospitalName, setsearchHospitalName] = useState();
  const [isVisibleDiameter, setIsVisibleDiameter] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [radius_hospital, setradius_hospital] = useState(2000);
  const [isLoading, setisLoading] = useState(true);

  // const radius_hospital = 5000;
  const list = [
    {
      title: 'Within 2 Km',
      value: 2000,
      // onPress: () => {setradius_hospital(2000);setIsVisibleDiameter(false)},
    },
    {
      title: 'Within 5 Km',
      value: 5000,
    },
    {
      title: 'Within 10Km',
      value: 10000,
    },
    {
      title: 'Within 20Km',
      value: 20000,
    },

    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisibleDiameter(false),
    },
  ];
  useEffect(() => {
    hospitalCheck();
  }, [radius_hospital]);
  const hospitalCheck = async () => {
    setisLoading(true);

    sethospitalData([]);

    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
    await Geolocation.getCurrentPosition(
      info => {
        // console.log({info});
        const {latitude, longitude} = info.coords;
        const overpassQuery = `
    [out:json];
    node(around:${radius_hospital},${latitude}, ${longitude})["amenity"="hospital"];
    out;
    `;
        fetch(overpassEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            // console.log(data);
            const hospital_dictrict_data = data.elements.map(
              (item, index) => item.tags,
              // item.tags['addr:district'],
            );
            // console.log({hospital_dictrict_data});
            sethospitalData(hospital_dictrict_data);
          })
          .catch(
            error => {
              // Handle errors here
              console.error('Error:', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      },
      error => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  return (
    <ScrollView>
      <ListItem.Accordion
        content={
          <>
            <MaterialCommunityIcons name="hospital" size={40} color="red" />
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold', fontSize: 18}}>
                Hospital
              </ListItem.Title>
            </ListItem.Content>
            <Button
              title="Range"
              onPress={() => setIsVisibleDiameter(true)}
              buttonStyle={styles.button}
            />
            <BottomSheet modalProps={{}} isVisible={isVisibleDiameter}>
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={() => {
                    setradius_hospital(l.value);
                    setIsVisibleDiameter(false);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      {l.title}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        <Input
          placeholder="Search by name"
          // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          errorStyle={{color: 'red'}}
          errorMessage={
            searchHospitalName?.length !== 0 ? '' : 'Enter a valid Name!'
          }
          onChangeText={value => {
            console.log(value.length);
            setsearchHospitalName(value);
          }}
        />
        {isLoading && <ActivityIndicator size="large" />}

        {hospitalData?.map((item, index) => (
          <ListItem
            key={index.toString()}
            onPress={() => console.log('Hospital details', item)}
            bottomDivider>
            <MaterialCommunityIcons
              name="hospital-marker"
              size={25}
              color="red"
            />
            <ListItem.Content>
              <ListItem.Title>{item?.name}</ListItem.Title>

              <ListItem.Subtitle>
                Address: {item?.['addr:full']}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                Postcode: {item?.['addr:postcode']}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                State: {item?.['addr:state']}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                District: {item?.['addr:district']}
              </ListItem.Subtitle>
              <ListItem.Subtitle>Source: {item?.source}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 8,
    width: 100,
  },
});
