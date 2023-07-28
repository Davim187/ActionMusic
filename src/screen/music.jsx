import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
function Music({route}) {
  const {data, title} = route.params;
  const [sliderValue, setSliderValue] = useState(50);

  const onSliderValueChange = value => {
    setSliderValue(value);
  };

  return (
    <View style={styles.container}>
      <Image source={data.item.artwork} style={styles.image} />
      <Text style={styles.name}>{data.item.title}</Text>
      <Text style={styles.name}>{data.item.artist}</Text>
      <View>
        <Slider 
        minimumValue={0}
         maximumValue={100}
         value={sliderValue}
         onValueChange={onSliderValueChange}
         />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3F7F',
  },
  image: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    marginLeft: 30,
  },
});

export default Music;
