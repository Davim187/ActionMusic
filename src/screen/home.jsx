import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Button from '../componentes/button/button';
import Title from '../componentes/title/title';

const {width, height} = Dimensions.get('screen');
function Home() {
  const [user, setUser] = useState('');

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.content}>
        <Text>awdawd</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // blue: #1E3F7F;
  // orange: #F7B301;
  // green: #176A38;
  // lightblue:#3F9EE1;

  container: {
    flex: 1,
    backgroundColor: '#1E3F7F',
  },

});

export default Home;
