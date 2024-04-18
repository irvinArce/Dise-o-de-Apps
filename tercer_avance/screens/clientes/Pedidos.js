import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, Image } from 'react-native';
import Button from "../../components/Button";

//const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/getEstadoPedidoEspera.php?cliente="+userData.numero

export default function Pedidos ({route}) {

    const { userData } = route.params ?? { userData: null };

    const [data, setData] = useState(null);
    const [proceso, setProceso] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/getEstadoPedidoEspera.php?cliente="+userData.numero
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(result => {
    //             setData(result);
    //             useEffect(() => {
    //                 const url2 = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/getEstadoPedidoProceso.php?cliente="+userData.numero
    //                 fetch(url2)
    //                     .then(response => response.json())
    //                     .then(result => {
    //                         setIsLoading(false);
    //                         setProceso(result);
    //                     })
    //                     .catch(error => {
    //                         setIsLoading(false);
    //                         setError(error);
    //                     });
    //             }, []);
    //         })
    //         .catch(error => {
    //             setIsLoading(false);
    //             setError(error);
    //         });
    // }, []);

    useEffect(() => {
        const urlEspera = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/getEstadoPedidoEspera.php?cliente="+userData.numero;
        const urlProceso = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/getEstadoPedidoProceso.php?cliente="+userData.numero;
    
        Promise.all([fetch(urlEspera).then(response => response.json()), fetch(urlProceso).then(response => response.json())])
            .then(([esperaResult, procesoResult]) => {
                setData(esperaResult);
                setProceso(procesoResult);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, []);

    // const getContent = () => {
    //     if (isLoading) {
    //         return (
    //             <View>
    //                 <Text style={styles.textProps}>Loading Data...</Text>
    //                 <ActivityIndicator size="large" />
    //             </View>
    //         );
    //     }
    //     if (error) {
    //         return <Text style={styles.text}>{error}</Text>;
    //     }

    //     return (
    //         <FlatList
    //             data={data}
    //             renderItem={({ item }) => (
    //                 <View style={styles.radio}>
    //                     {console.log(data)}
    //                     <Text> Numero de pedido: {item.Pedido} </Text>
    //                     <Text> Numero de producto: {item.NumProducto} </Text>
    //                     <Text> IVA: {item.IVA} </Text>
    //                     <Text> Subtotal: {item.Subtotal} </Text>
    //                     <Text> Total: {item.Total} </Text>
    //                     <Text> Fecha del pedido: {item.FechaPedido} </Text>
    //                     <Text> {"\n"} </Text>
    //                 </View>
    //             )}
    //             keyExtractor={(item, index) => index.toString()}
    //         />
    //     );
    // };

    // const getContent2 = () => {
    //     if (isLoading) {
    //         return (
    //             <View>
    //                 <Text style={styles.textProps}>Loading Data...</Text>
    //                 <ActivityIndicator size="large" />
    //             </View>
    //         );
    //     }
    //     if (error) {
    //         return <Text style={styles.text}>{error}</Text>;
    //     }

    //     return (
    //         <FlatList
    //             data={proceso}
    //             renderItem={({ item }) => (
    //                 <View style={styles.radio}>
    //                     {console.log(data)}
    //                     <Text> Numero de pedido: {item.Pedido} </Text>
    //                     <Text> Numero de producto: {item.NumProducto} </Text>
    //                     <Text> IVA: {item.IVA} </Text>
    //                     <Text> Subtotal: {item.Subtotal} </Text>
    //                     <Text> Total: {item.Total} </Text>
    //                     <Text> Fecha del pedido: {item.FechaPedido} </Text>
    //                     <Text> {"\n"} </Text>
    //                 </View>
    //             )}
    //             keyExtractor={(item, index) => index.toString()}
    //         />
    //     );
    // };
    const getContent = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
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
                    <View style={styles.contentContainer}>
                        <Text style={styles.label}>Numero de pedido:</Text>
                        <Text style={styles.text}>{item.Pedido}</Text>
                        <Text style={styles.label}>Numero de producto:</Text>
                        <Text style={styles.text}>{item.NumProducto}</Text>
                        <Text style={styles.label}>IVA:</Text>
                        <Text style={styles.text}>{item.IVA}</Text>
                        <Text style={styles.label}>Subtotal:</Text>
                        <Text style={styles.text}>{item.Subtotal}</Text>
                        <Text style={styles.label}>Total:</Text>
                        <Text style={styles.text}>{item.Total}</Text>
                        <Text style={styles.label}>Fecha del pedido:</Text>
                        <Text style={styles.text}>{item.FechaPedido}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    };
    
    const getContent2 = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
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
                data={proceso}
                renderItem={({ item }) => (
                    <View style={styles.contentContainer}>
                        <Text style={styles.label}>Numero de pedido:</Text>
                        <Text style={styles.text}>{item.Pedido}</Text>
                        <Text style={styles.label}>Numero de producto:</Text>
                        <Text style={styles.text}>{item.NumProducto}</Text>
                        <Text style={styles.label}>IVA:</Text>
                        <Text style={styles.text}>{item.IVA}</Text>
                        <Text style={styles.label}>Subtotal:</Text>
                        <Text style={styles.text}>{item.Subtotal}</Text>
                        <Text style={styles.label}>Total:</Text>
                        <Text style={styles.text}>{item.Total}</Text>
                        <Text style={styles.label}>Fecha del pedido:</Text>
                        <Text style={styles.text}>{item.FechaPedido}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    };
    

    return (
        <><View style={styles.head}>
            <Image source={require('../../assets/iconpc.png')} style={styles.logoImage} />
            <Text style={styles.textoHead}>PC BUILDER</Text>
        </View><ScrollView>
                <View>
                    <Text style={styles.Title}>Mis pedidos</Text>
                    <Text>  </Text>
                    <Text style={styles.subTitle}> En espera </Text>
                    {getContent()}
                    <Text style={styles.subTitle}> En proceso </Text>
                    {getContent2()}
                </View>
            </ScrollView></>
    );
}

const styles = StyleSheet.create({
    head: {
        height: 120,
        backgroundColor: '#E1F7F5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoHead: {
        marginTop:30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', // Color blanco para que coincida con el fondo
        marginLeft: 10, // Para dejar un espacio entre la imagen y el texto
    },
    logoImage: {
        marginTop: 30,
        width: 80, // Ancho deseado de la imagen
        height: 80, // Altura deseada de la imagen
        marginLeft: 20, // Para dejar un espacio a la izquierda de la imagen
    },
    Title: {
        marginTop:30,
        fontSize: 35,
        textAlign: "center",
        marginBottom: 20,
        color: "#007bff",
    },
    subTitle: {
        marginTop:40,
        fontSize: 20,
        textAlign: "justify",
        marginBottom: 20,
        color: "#007bff",
        marginLeft: 20, 
    },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentContainer: {
            backgroundColor: '#ffffff',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            marginLeft: 20,
            marginRight: 20,
        },
        label: {
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