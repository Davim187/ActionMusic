import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

function Title() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../img/tijucaRedondo.png')}
        style={styles.imgTijuca}
      />
      <Text style={styles.headerText}>TijuFy</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    header: {
        flex:0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E3F7F',
      },
      headerText: {
        fontSize: 40,
        color: '#fff',
        fontWeight:'bold'
      },
      imgTijuca: {
        width: '40%',
        height: '65%',
        
      },
});

export default Title;
