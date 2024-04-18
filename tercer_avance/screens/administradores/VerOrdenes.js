// https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getAllPedidosAdminEspera.php

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

export default function VerOrdenes ({route, navigation}) {

    const { userData } = route.params ?? { userData: null };

    const [data, setData] = useState(null);
    const [proceso, setProceso] = useState(null);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    useEffect(() => {
        const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Ordenestrabajo/getAllOrdenes.php";
    
        Promise.all([fetch(url).then(response => response.json())])
            .then(([orden]) => {
                setData(orden);
            })
    },  []);

    const getContent = () => {

        return (
            <View style={styles.container}>
                <Text style={styles.Title}> ORDENES DE TRABAJO </Text>
                <FlatList
                    style={styles.cont}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.text}> Pedido: {item.Pedido}                     Codigo de la Orden: {item.OrdenPedido} </Text>
                            <Text style={styles.text}> Orden: {item.Orden} </Text>
                            <Text style={styles.text}> Administrador: {item.Admin} </Text>
                            <Text style={styles.text}> Fecha de inicio: {item.FechaI} </Text>
                            <Text style={styles.text}> Fecha final: {item.FechaF} </Text>
                            <Text style={styles.text}> Estado: {item.Estado} </Text>
                            <Text> {"\n"} </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {getContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%', // Adjust horizontal padding
        paddingTop: '5%',
        marginTop:1,

    },
    Title: {
        fontSize: 30,
    textAlign: "center",
    marginTop: "10%",
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#9AC8CD",
    paddingVertical: 10,
    borderRadius: 10,
    },
    cont: {
        paddingBottom: '5%',
        backgroundColor:"#E1F7F5",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    section:{
        backgroundColor: '#E1F7F5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    text: {
        fontWeight:"bold",
    },
    textin: {
        
    },

});