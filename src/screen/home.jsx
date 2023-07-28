import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicListItem from '../componentes/musicListe/MusicListItem';
import { songs } from '../MusicSongs';

function Home() {
  const [nameUser, setNameUser] = useState('');

  async function getName() {
    setNameUser(await AsyncStorage.getItem('nameUsuario'));
    console.log(nameUser);
  }

  getName();
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Ola {nameUser}!! {'😀'}
        </Text>
      </View>
      <View style={styles.content}>
      <FlatList
      data={songs}
      renderItem={(item, index) => {
       return < MusicListItem item={item} index={index} data={songs}/>
      }}/>
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
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 15,
    borderRadius: 10,
  },
});

export default Home;
