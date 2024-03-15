import React from "react";
import {View, StyleSheet} from "react-native";

import Button from "../components/Button";

export default function Home({navigation}){
    return(
        <View style={styles.container}>
            <Button onPress={() => {
                navigation.navigate('Uno')
            }} 
            label="Lista de todos los pendientes (solo IDs)"/>

            <Button onPress={() => {
                navigation.navigate('Dos')
            }} 
            label="Lista de todos los pendientes (IDs y Titles)"/>

            <Button onPress={() => {
                navigation.navigate('Tres')
            }} 
            label="Lista de todos los pendientes sin resolver (ID y Title)"/>

            <Button onPress={() => {
                navigation.navigate('Cuatro')
            }} 
            label="Lista de todos los pendientes resueltos (ID y Title)"/>

            <Button onPress={() => {
                navigation.navigate('Cinco')
            }} 
            label="Lista de todos los pendientes (IDs y userID)"/>

            <Button onPress={() => {
                navigation.navigate('Seis')
            }} 
            label="Lista de todos los pendientes resueltos (ID y userID)"/>

            <Button onPress={() => {
                navigation.navigate('Siete')
            }} 
            label="Lista de todos los pendientes sin resolver (ID y userID)"/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefefe',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
    },
  });