import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

export default function Fuente({ route, navigation }) {

    const { userData } = route.params;
    const { formData } = route.params;

    const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Componentes/getAllComponentes.php?componente=fuenteAlimentacion&gama=" + formData.gama;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        handleSubmit,
        setValue,
        watch,
    } = useForm();

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                setData(result);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, []);

    const onSubmit = (data) => {
        if (!data.fuente) {
            Alert.alert('Campo requerido', 'Por favor selecciona una opcion');
            return;
        }
        // array = formData.push(...data)
        const array = { ...formData, ...data };
        navigation.navigate('Cantidad', { formData: array , userData: userData});
    };

    const getContent = () => {
        if (isLoading) {
            return (
                <View>
                    <Text style={styles.textProps}>Loading Data...</Text>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        if (error) {
            return <Text style={styles.text}>{error}</Text>;
        }

        return (
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.radio}>
                        <RadioButton.Item
                            label={item.nombre}
                            value={item.numero}
                            onPress={() => setValue("fuente", item.numero)}
                            status={watch("fuente") === item.numero ? 'checked' : 'unchecked'}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => (
                    <Button label={"Continuar"} onPress={handleSubmit(onSubmit)} />
                )}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Selecciona la Fuente de Alimentacion</Text>
            {getContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Title: {
        marginTop:20,
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
        color: "#007bff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    radio: {
        marginVertical: 5,
    },
});