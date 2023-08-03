import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {songs} from '../MusicSongs';
import Slider from '@react-native-community/slider';
import MusicAction from '../componentes/musicAction';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';

const {height, width} = Dimensions.get('window');

function Music({route}) {
  const ref = useRef();
  const progress = useProgress();
  const {id} = route.params;
  const [song, setSong] = useState(id);
  const playbackState = usePlaybackState();

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: false,
        index: song,
      });
    }, 400);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={songs}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.viewImage}>
                <Image source={item.artwork} style={styles.image} />
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.nameArtist}>{item.artist}</Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        <Slider
          value={progress.position}
          maximumValue={progress.duration}
          minimumValue={0}
          style={styles.slider}
          thumbTintColor="#C5002F"
          maximumTrackTintColor="#fff"
          minimumTrackTintColor="#fff"
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <MusicAction
        styleBtn={{height: 60, width: 60}}
        style={{
          flexDirection: 'row',
          margin: 40,
          padding: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 2,
          borderColor: '#C5002F',
          borderRadius: 20,
          justifyContent: 'center',
        }}
        sourceNext={require('../img/nextBranco.png')}
        sourceVolta={require('../img/previousBranco.png')}
        sourcePlay={
          playbackState == State.Paused ||
          playbackState == State.Ready ||
          playbackState === State.Buffering ||
          playbackState === State.Connecting
            ? require('../img/playBranco.png')
            : require('../img/pausaBranco.png')
        }
        onPressVolta={async () => {
          if (song > 0) {
            setSong(song - 1);
            var songId = parseInt(song - 1);
            if (songId == 0) {
              console.log(songId);
              Alert.alert('Não tem mais musicas para voltar!!');
            } else {
              await TrackPlayer.skip(songId);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(song) - 1,
              });
              await TrackPlayer.pause();
              console.log(playbackState);
            }
          }
        }}
        onPressNext={async () => {
          if (songs.length - 1 > song) {
            setSong(song + 1);
            ref.current.scrollToIndex({
              animated: true,
              index: parseInt(song) + 1,
            });
            await TrackPlayer.skip(parseInt(song + 1));
            await TrackPlayer.pause();
            console.log(playbackState);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C1C',
  },
  image: {
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff4444a3',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
  },
  nameArtist: {
    marginTop: 3,
    fontSize: 15,
    color: '#fff',
  },
  slider: {
    margin: 10,
    color: '#fff',
  },
  viewBtn: {
    flexDirection: 'row',
    marginLeft: 60,
    marginTop: 20,
  },
  btnMusic: {
    height: 80,
    width: 80,
  },
  viewImage: {
    width: width,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Music;
