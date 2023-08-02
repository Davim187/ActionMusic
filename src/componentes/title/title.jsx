import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

function Title() {
  return (
    <View style={styles.header}>
     <Text style={styles.Action}>
        Action<Text style={styles.Music}>Music</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    header: {
        flex:0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0C1C',
      },
      Action: {
        fontSize: 48,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
        color: 'white',
      },
      Music: {
        color: '#C5002F',
        fontSize: 48,
      },
});

export default Title;
