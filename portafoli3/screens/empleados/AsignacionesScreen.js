import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

const AsignacionScreen = ({ route, navigation }) => {
    const { userData } = route.params ?? { userData: null };


    const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Asignaciones/getAsignacionEmpleado.php?matricula="+userData.matricula;
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                setIsLoading(false);
                setData(result);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message); 
            });
    }, []);

    const onPress = (asig, estado) => {
        const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_asig/setEstado_asig.php?estado="+estado+"&asignacion="+asig;
        Promise.all([
            fetch(url).then(response => {
                return response.json();
            }),
        ])
        .then(() => {
            navigation.navigate('Asignaciones', { userData: userData });
        })
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        if (error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </View>
            );
        }

        // return (
        //     <FlatList
        //         data={data}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={({ item }) => (
        //             if (item.Estado !== 'Finalizado') {
        //                 return (
        //                     <View style={styles.item}>
        //                         <Text style={styles.label}>Asignación:</Text>
        //                         <Text style={styles.text}>{item.Asignacion}</Text>
        //                         <Text style={styles.label}>Orden:</Text>
        //                         <Text style={styles.text}>{item.Orden}</Text>
        //                         {/* Otros elementos */}
        //                         <Button label="Comenzar" onPress={() => onPress(item.Asignacion, "PROCE")} />
        //                         <Button label="Finalizar" onPress={() => onPress(item.Asignacion, "FINAL")} />
        //                     </View>
        //                 );
        //             } else {
        //                 // Renderizar solo el contenido sin los botones si el estado es "Finalizado"
        //                 return (
        //                     <View style={styles.item}>
        //                         <Text style={styles.label}>Asignación:</Text>
        //                         <Text style={styles.text}>{item.Asignacion}</Text>
        //                         <Text style={styles.label}>Orden:</Text>
        //                         <Text style={styles.text}>{item.Orden}</Text>
        //                         {/* Otros elementos */}
        //                     </View>
        //                 );
        //             }
        //             // <View style={styles.item}>
        //             //     <Text style={styles.label}>Asignación:</Text>
        //             //     <Text style={styles.text}>{item.Asignacion}</Text>
        //             //     <Text style={styles.label}>Orden:</Text>
        //             //     <Text style={styles.text}>{item.Orden}</Text>
        //             //     <Text style={styles.label}>Actividad:</Text>
        //             //     <Text style={styles.text}>{item.Actividad}</Text>
        //             //     <Text style={styles.label}>Admin:</Text>
        //             //     <Text style={styles.text}>{item.Admin}</Text>
        //             //     <Text style={styles.label}>Detalles:</Text>
        //             //     <Text style={styles.text}>{item.Detalles}</Text>
        //             //     <Text style={styles.label}>Num Orden:</Text>
        //             //     <Text style={styles.text}>{item.NumOrden}</Text>
        //             //     <Text style={styles.label}>Nombre Actividad:</Text>
        //             //     <Text style={styles.text}>{item.NmbActividad}</Text>
        //             //     <Text style={styles.label}>Estado:</Text>
        //             //     <Text style={styles.text}>{item.Estado}</Text>
        //             //     <Text style={styles.label}>Hora inicio:</Text>
        //             //     <Text style={styles.text}>{item.HoraInicio}</Text>
        //             //     <Text style={styles.label}>Fecha inicio:</Text>
        //             //     <Text style={styles.text}>{item.FechaInicio}</Text>
        //             //     <Button label="Comenzar" onPress={() => onPress(item.Asignacion, "PROCE")} />
        //             //     <Button label="Finalizar" onPress={() => onPress(item.Asignacion, "FINAL")} />
        //             // </View>
        //         )}
        //     />
        // );
        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    if (item.Estado === 'Espera') {
                        return (
                            <View style={styles.item}>
                                <Text style={styles.label}>Asignación:</Text>
                                <Text style={styles.text}>{item.Asignacion}</Text>
                                <Text style={styles.label}>Orden:</Text>
                                <Text style={styles.text}>{item.Orden}</Text>
                                <Text style={styles.label}>Actividad:</Text>
                                <Text style={styles.text}>{item.Actividad}</Text>
                                <Text style={styles.label}>Admin:</Text>
                                <Text style={styles.text}>{item.Admin}</Text>
                                <Text style={styles.label}>Detalles:</Text>
                                <Text style={styles.text}>{item.Detalles}</Text>
                                <Text style={styles.label}>Num Orden:</Text>
                                <Text style={styles.text}>{item.NumOrden}</Text>
                                <Text style={styles.label}>Nombre Actividad:</Text>
                                <Text style={styles.text}>{item.NmbActividad}</Text>
                                <Text style={styles.label}>Estado:</Text>
                                <Text style={styles.text}>{item.Estado}</Text>
                                <Text style={styles.label}>Hora inicio:</Text>
                                <Text style={styles.text}>{item.HoraInicio}</Text>
                                <Text style={styles.label}>Fecha inicio:</Text>
                                <Text style={styles.text}>{item.FechaInicio}</Text>
                                <Button label="Comenzar" onPress={() => onPress(item.Asignacion, "PROCE")} />
                            </View>
                        );
                    } else if (item.Estado === 'Proceso') {
                        return (
                            <View style={styles.item}>
                                <Text style={styles.label}>Asignación:</Text>
                                <Text style={styles.text}>{item.Asignacion}</Text>
                                <Text style={styles.label}>Orden:</Text>
                                <Text style={styles.text}>{item.Orden}</Text>
                                <Text style={styles.label}>Actividad:</Text>
                                <Text style={styles.text}>{item.Actividad}</Text>
                                <Text style={styles.label}>Admin:</Text>
                                <Text style={styles.text}>{item.Admin}</Text>
                                <Text style={styles.label}>Detalles:</Text>
                                <Text style={styles.text}>{item.Detalles}</Text>
                                <Text style={styles.label}>Num Orden:</Text>
                                <Text style={styles.text}>{item.NumOrden}</Text>
                                <Text style={styles.label}>Nombre Actividad:</Text>
                                <Text style={styles.text}>{item.NmbActividad}</Text>
                                <Text style={styles.label}>Estado:</Text>
                                <Text style={styles.text}>{item.Estado}</Text>
                                <Text style={styles.label}>Hora inicio:</Text>
                                <Text style={styles.text}>{item.HoraInicio}</Text>
                                <Text style={styles.label}>Fecha inicio:</Text>
                                <Text style={styles.text}>{item.FechaInicio}</Text>
                                <Button label="Finalizar" onPress={() => onPress(item.Asignacion, "FINAL")} />
                            </View>
                        );
                    } else {
                        return (
                            <View style={styles.item}>
                                <Text style={styles.label}>Asignación:</Text>
                                <Text style={styles.text}>{item.Asignacion}</Text>
                                <Text style={styles.label}>Orden:</Text>
                                <Text style={styles.text}>{item.Orden}</Text>
                                <Text style={styles.label}>Actividad:</Text>
                                <Text style={styles.text}>{item.Actividad}</Text>
                                <Text style={styles.label}>Admin:</Text>
                                <Text style={styles.text}>{item.Admin}</Text>
                                <Text style={styles.label}>Detalles:</Text>
                                <Text style={styles.text}>{item.Detalles}</Text>
                                <Text style={styles.label}>Num Orden:</Text>
                                <Text style={styles.text}>{item.NumOrden}</Text>
                                <Text style={styles.label}>Nombre Actividad:</Text>
                                <Text style={styles.text}>{item.NmbActividad}</Text>
                                <Text style={styles.label}>Estado:</Text>
                                <Text style={styles.text}>{item.Estado}</Text>
                                <Text style={styles.label}>Hora inicio:</Text>
                                <Text style={styles.text}>{item.HoraInicio}</Text>
                                <Text style={styles.label}>Fecha inicio:</Text>
                                <Text style={styles.text}>{item.FechaInicio}</Text>
                            </View>
                        );
                    }
                }}
            />
        );
    };

    return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#0E46A3',
    },
    text: {
        fontSize: 14,
        color: '#333333',
    },
});

export default AsignacionScreen;
