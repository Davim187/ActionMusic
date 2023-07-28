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
function Login() {
  const [user, setUser] = useState('');

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.content}>
        <View style={styles.contentLogin}>
          <Text style={styles.textLogin}>Login</Text>
          <TextInput
            placeholder="Usuario"
            onChangeText={setUser}
            placeholderTextColor="#fff"
            style={styles.userInput}
          />
          <Button />
        </View>
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

  content: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3F7F',
  },
  contentLogin: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    width: '80%',
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 20,
  },

  userInput: {
    borderBottomWidth: 2,
    borderColor: '#fff',
    marginLeft: 50,
    marginBottom: 30,
    marginRight: 50,
    marginTop: 20,
  },
  textLogin: {
    padding: 20,
    fontSize: 30,
    fontWeight:'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Login;
