import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import {songs} from '../../MusicSongs';

function musicAction({id, onPressVolta, onPressNext, sourcePlay, sourceNext, sourceVolta, style, styleBtn}) {
  const ref = useRef();
  const playbackState = usePlaybackState();
  const [song, setSong] = useState(id);

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
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
      await TrackPlayer.skip(currentSong);
      togglePlayback(playbackState);
    } catch (e) {}
  };

  const togglePlayback = async playbackState => {
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
    <View style={style}>
      <TouchableOpacity onPress={onPressVolta}>
        <Image
          style={styleBtn}
          source={sourceVolta}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          togglePlayback(playbackState);
        }}>
        <Image
          style={styleBtn}
          source={ sourcePlay
           
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNext}>
        <Image
          style={styleBtn}
          source={sourceNext}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBtn: {
    flexDirection: 'row',
    margin: 40,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: '#C5002F',
    borderRadius: 20,
    justifyContent: 'center',
  },
  btnMusic: {
    height: 60,
    width: 60,
  },
});

export default musicAction;
