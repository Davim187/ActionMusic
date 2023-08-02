import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {songs} from '../../MusicSongs';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function MusicListeItem({item, index, data}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[item.index == 0 ? styles.index0 : styles.container]}
      onPress={async () => {
        console.log(item);
        navigation.navigate('Music', {
          id: item.index,
        });
      }}>
      <Image source={item.item.artwork} style={styles.songImages} />
      <View style={styles.nameView}>
        <Text style={styles.nameTitle}>{item.item.title}</Text>
        <Text style={styles.nameArtist}>{item.item.artist}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Music', {
            id: item.index,
          });
        }}>
        <Image source={require('../../img/play.png')} style={styles.play} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    elevation: 5,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
  songImages: {
    width: 100,
    height: 90,
    borderRadius: 10,
    marginLeft: 7,
    borderWidth:2,
    borderColor:'#C5002F'
  },
  nameView: {
    paddingLeft: 15,
    width: '50%',
  },
  nameTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  nameArtist: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  play: {
    width: 30,
    height: 30,
    borderRadius:15,
    borderWidth:2,
    borderColor:'#C5002F'
  },
  index0: {
    display: 'none',
  },
});

export default MusicListeItem;
