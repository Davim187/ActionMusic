import React from 'react';
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
function MusicListeItem({item, index, data}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {marginBottom: index == data.length - 1 ? 30 : 0},
      ]}
      onPress={() => {
        navigation.navigate('Music', {
          data: item,
          index: index,
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
            data: item,
            index: index,
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
  },
});

export default MusicListeItem;
