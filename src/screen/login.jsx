import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Button from '../componentes/button';
import Title from '../componentes/title';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen');

function Login({navigation}) {
  
  const [user, setUser] = useState('');
  const [err, setErr] = useState(false)
  const [msgErr, setMsgErr] = useState('')

  useEffect(() =>{
    toCheck()
  },[toCheck])

  const access = async () =>{
    try {
      if (user === ""){
        setErr(true)
        setMsgErr('Preencha todos os campos' )
      }
      else{
        setErr(false)
        setMsgErr('')
        await AsyncStorage.setItem('nameUsuario',user)
        console.log('userName: '+ user)
        navigation.navigate("Home")
      }
    } catch (error) {
      console.log("err :"+ error)
    }
  }
 

  async function toCheck(){
    const name =  await AsyncStorage.getItem('nameUsuario')
    if (name) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
    }

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
            style={err ? styles.msgErrInput :styles.userInput  }
          />
        <Text style={err ? styles.msgErrTrue :styles.msgErrFalse}>{msgErr}</Text>
          <Button onPress={access}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#0D0C1C',
  },

  content: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0C1C',
    marginTop:150
  },
  contentLogin: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    width: '80%',
    height: 250,
    borderWidth: 2,
    borderColor: '#C5002F',
    marginTop: 20,
  },
  msgErrFalse:{
    display:'none'
  },
  msgErrTrue:{
    color:"#ff4444a3",
    marginBottom: 10,
    textAlign:'center'
  },
  msgErrInput:{
    borderBottomWidth: 2,
    borderColor: '#ff4444a3',
    marginLeft: 50,
    marginBottom: 10,
    marginRight: 50,
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
