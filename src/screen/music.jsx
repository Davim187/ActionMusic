import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
function Music({route}) {
  const {artwork, artist, title} = route.params;
  const [sliderValue, setSliderValue] = useState(50);

  const onSliderValueChange = value => {
    setSliderValue(value);
  };

  return (
    <View style={styles.container}>
      <Image source={artwork} style={styles.image} />
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.nameArtist}>Artista: {artist}</Text>
      <View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={sliderValue}
          onValueChange={onSliderValueChange}
        />
      </View>
      <View style>

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
    marginTop: 100,
    borderRadius: 10,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    marginLeft: 30,
  },
  nameArtist: {
    marginTop: 3,
    fontSize: 15,
    color: '#fff',
    marginLeft: 30,
  },
  slider: {
    margin: 10,
  },
});

export default Music;
