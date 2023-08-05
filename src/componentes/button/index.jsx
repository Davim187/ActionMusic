import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Button({onPress}){
    return(
        <View>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.textButton}>Acessar</Text>              
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:'#C5002F',
        padding:10,
        marginLeft:30,
        marginRight:30,
        borderRadius:20,
    },
    textButton:{
        textAlign:'center',
        fontSize:17
    }
  });
  
export default Button