import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Button({onPress, label}){
    return (
        <View style={styles.button_container}>
            <Pressable 
            onPress={onPress}
            style = {styles.button}>
                <Text style={styles.button_label}> {label} </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button_container: {
        borderWidth: 4,
        border_radius: 18,
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: "#FFF",
        border_radius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button_label: {
        font_size: 16,
    },
});