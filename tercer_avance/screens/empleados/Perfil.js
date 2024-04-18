import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Perfil = ({ route }) => {
    const { userData } = route.params ?? { userData: null };

    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Perfil del Usuario</Text>
            <Image source={require('../../img/images.png')} style={styles.image} />
            {userData ? (
                <View style={styles.userDataContainer}>
                    <Text style={styles.userInfo}>Nombre: {userData.nombre}</Text>
                    <Text style={styles.userInfo}>Apellido Paterno: {userData.apePaterno}</Text>
                    <Text style={styles.userInfo}>Apellido Materno: {userData.apeMaterno}</Text>
                    <Text style={styles.userInfo}>Correo electrónico: {userData.correo}</Text>
                    {/* Agrega más detalles según la estructura de tus datos */}
                </View>
            ) : (
                <Text style={styles.text}>No se han proporcionado datos de usuario.</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 32,
        marginBottom: 20,
        color: "#1E0342",
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
        color: "#0E46A3",
    },
    userDataContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10,
        color: "#9AC8CD",
    },
    button: {
        backgroundColor: "#0E46A3",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});

export default Perfil;