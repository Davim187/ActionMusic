import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {songs} from '../MusicSongs';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
const {height, width} = Dimensions.get('window');

function Music({route}) {
  const {id} = route.params;
  const [song, setSong] = useState(id);
  const ref = useRef();
  const progress = useProgress();
  const playbackState = usePlaybackState();


  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: false,
        index: song,
      })
    }, 300);
  }, []);

  useEffect(() => {
    setupPlayer()
  }, []);
  
const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    await TrackPlayer.add(songs);
    await TrackPlayer.skip(song);
    togglePlayback(playbackState);
  };
  
  const togglePlayback = async playbackState => {
    console.log(playbackState);
    if (
      playbackState === State.Paused ||
      playbackState === State.Ready ||
      playbackState === State.Buffering ||
      playbackState === State.Connecting 
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

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
            togglePlayback(playbackState);
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.viewImage}>
                <Image source={item.artwork} style={styles.image} />
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.nameArtist}>Artista: {item.artist}</Text>
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
      <View style={styles.viewBtn}>
        <TouchableOpacity
          onPress={async () => {
            if (song > 0) {
              setSong(song - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(song) - 1,
              });
              await TrackPlayer.skip(parseInt(song - 1));
              await TrackPlayer.pause();
            }
          }}>
          <Image
            style={styles.btnMusic}
            source={require('../img/previous.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            togglePlayback(playbackState);
            // setupPlayer();
          }}>
          <Image
            style={styles.btnMusic}
            source={
              playbackState == State.Paused ||
              playbackState == State.Ready ||
              playbackState === State.Buffering ||
              playbackState === State.Connecting
                ?require('../img/playBranco.png') 
                : require('../img/pausa.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (songs.length - 1 > song) {
              setSong(song + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(song) + 1,
              });
              await TrackPlayer.skip(parseInt(song + 1));
              togglePlayback(playbackState);
            }
          }}>
          <Image style={styles.btnMusic} source={require('../img/next.png')} />
        </TouchableOpacity>
      </View>
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
    borderWidth:2,
    borderColor:'#ff4444a3'
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    // marginLeft: 30,
  },
  nameArtist: {
    marginTop: 3,
    fontSize: 15,
    color: '#fff',
    // marginLeft: 30,
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
