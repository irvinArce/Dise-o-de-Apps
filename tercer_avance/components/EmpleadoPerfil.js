import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Platform, StyleSheet } from "react-native";

const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getEmpleado.php";

export default function EmpleadoPerfil() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                setData(result);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message); // Aquí capturamos el mensaje de error
            });
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textSize}>Loading Data</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        if (error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textSize}>Error: {error}</Text>
                </View>
            );
        }

        // Aquí renderizamos los datos recuperados
        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Matrícula: {item.matricula}</Text>
                        <Text>Nombre: {item.nombre}</Text>
                        <Text>Apellido Paterno: {item.apePaterno}</Text>
                        <Text>Apellido Materno: {item.apeMaterno}</Text>
                        <Text>Dirección: {item.dirCalle} {item.dirNumero} {item.dirColonia} {item.dirCP}</Text>
                        <Text>Correo: {item.correo}</Text>
                        <Text>Número de Teléfono: {item.numTel}</Text>
                    </View>
                )}
            />
        );
    };

    return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === 'web' ? 20 : 0, // Añadir paddingTop solo en web
    },
    textSize: {
        fontSize: 24,
        marginBottom: 10,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
    },
});
