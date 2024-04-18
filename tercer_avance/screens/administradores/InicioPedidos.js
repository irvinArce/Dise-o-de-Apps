// https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getAllPedidosAdminEspera.php

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

export default function InicioPedidos ({route, navigation}) {

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
        const urlEspera = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getAllPedidosAdminEspera.php";
        const urlProceso = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getAllPedidosAdminProceso.php";
    
        Promise.all([fetch(urlEspera).then(response => response.json()), fetch(urlProceso).then(response => response.json())])
            .then(([esperaResult, procesoResult]) => {
                setData(esperaResult);
                setProceso(procesoResult);
            })
    },  []);

    const onPress1 = (pedido) => {
        const array = { pedido: pedido };
        navigation.navigate('Ordenes', { formData: array , userData: userData});
    }

    const getContent = () => {

        return (
            <View style={styles.container}>
                <Text style={styles.Title}> PEDIDOS EN ESPERA </Text>
                <FlatList
                    style={styles.cont}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.text}> Pedido: {item.Pedido}                     Numero de producto: {item.NumProducto} </Text>
                            <Text style={styles.text}> Cliente: {item.Cliente} </Text>
                            <Text style={styles.text}> Nombre Fiscal: {item.NombreFiscal} </Text>
                            <Text style={styles.text}> IVA: {item.IVA}              Estado del pedido: {item.Estado} </Text>
                            <Text style={styles.text}> Subtotal: {item.Subtotal}     Fecha del pedido: {item.FechaPedido} </Text>
                            <Text style={styles.text}> Total: {item.Total}          Administrador: {item.Administrador} </Text>
                            <Button label="Asignar ordenes de trabajo" onPress={() => handleSubmit(onPress1(item.Pedido))} />
                            <Text> {"\n"} </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    const getContent2 = () => {

        return (
            <View style={styles.container}>
                <Text style={styles.Title}> PEDIDOS EN PROCESO </Text>
                <FlatList
                    style={styles.cont}
                    data={proceso}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.text}> Pedido: {item.Pedido}                     Numero de producto: {item.NumProducto} </Text>
                            <Text style={styles.text}> Cliente: {item.Cliente} </Text>
                            <Text style={styles.text}> Nombre Fiscal: {item.NombreFiscal} </Text>
                            <Text style={styles.text}> IVA: {item.IVA}              Estado del pedido: {item.Estado} </Text>
                            <Text style={styles.text}> Subtotal: {item.Subtotal}     Fecha del pedido: {item.FechaPedido} </Text>
                            <Text style={styles.text}> Total: {item.Total}          Administrador: {item.Administrador} </Text>
                            <Button label="Asignar ordenes de trabajo" onPress={() => onPress1(item.Pedido)} />
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
            {getContent2()}
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