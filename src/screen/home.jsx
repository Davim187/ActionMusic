import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicListItem from '../componentes/musicListe';
import {songs} from '../MusicSongs';
import TrackPlayer from 'react-native-track-player';

function Home() {
  const [nameUser, setNameUser] = useState('');

  async function getName() {
    setNameUser(await AsyncStorage.getItem('nameUsuario'));
  }
  TrackPlayer.registerPlaybackService(() => require('../PlaybackService.js'));

  useEffect(() => {
    getName();

  }, []);


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
            return <MusicListItem item={item} index={index} data={songs} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C1C',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff4444a3',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff4444a3',
  },
});

export default Home;
