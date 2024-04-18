import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { RadioButton } from 'react-native-paper';

export default function Carrito({route, navigation}){

    const { userData } = route.params;
    const { formData } = route.params;

    const [data, setData] = useState(null);
    const [prod, setProd] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getPedidos.php?pedido="+formData.pedido.id;

    useEffect( () => {
        fetch(url)
        .then(response => response.json())
        .then(result => {
            setData(result[0]);
            const producto = "https://pcbuilder4a.000webhostapp.com/api-rest/Productos/getProducto0.php?producto="+result[0].NumProducto;
            fetch(producto)
            .then(response => response.json())
            .then(result => {
                console.log("Producto:")
                console.log(result);
                setProd(result[0]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
        }, error => {
            setIsLoading(false);
            setError(error);
        })
    } , []);

    const onSubmit = () => {
        const ep = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/setEstadoPedido.php?estado=ESPER&pedido="+formData.pedido.id
        Promise.all([
            fetch(ep)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching CPU:', error);
                }),
        ])
        // .then(([cpuResult, gpuResult, gabineteResult, placaResult, almacenamientoResult, refrigeracionResult, fuenteResult]) => {
        .then(() => {
            navigation.navigate('Pedidos', { userData: userData });
        })
    };

    const getContent = () => {
        if(isLoading){
            return(
                <View>
                    <Text style={styles.textProps}> Loading Data... </Text>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        if(error){
            return <Text style={styles.text}> {error} </Text>
        }

        return (
            // <View>
            //     <Text> Pedido: {formData.pedido.id} </Text>
            //     <Text> Numero de producto: {data.NumProducto} </Text>
            //     <Text> Cantidad: {data.Cantidad} </Text>
            //     <Text> IVA: {data.IVA} </Text>
            //     <Text> Subtotal: {data.Subtotal} </Text>
            //     <Text> Total: {data.Total} </Text>
            //     <Text> Informacion del producto </Text>
            //     <Text>  Cpu: {prod.Cpu} </Text>
            //     <Text>  Gpu: {prod.Gpu} </Text>
            //     <Text>  Almacenamiento: {prod.Almacenamiento} </Text>
            //     <Text>  Refrigeracion: {prod.Refrigeracion} </Text>
            //     <Text>  Placa Madre: {prod.PlacaMadre} </Text>
            //     <Text>  Fuente de Alimentacion: {prod.FuenteAlimentacion} </Text>
            //     <Text>  Gabinete: {prod.Gabinete} </Text>
            //     <Text>  Gama: {prod.Gama} </Text>
            //     <Button label="Realizar Pedido" onPress={handleSubmit(onSubmit)} />
            // </View>
            <View style={styles.contentContainer}>
                <Text style={styles.label}>Pedido:</Text>
                <Text style={styles.text}>{formData.pedido.id}</Text>
                <Text style={styles.label}>Número de producto:</Text>
                <Text style={styles.text}>{data.NumProducto}</Text>
                <Text style={styles.label}>Cantidad:</Text>
                <Text style={styles.text}>{data.Cantidad}</Text>
                <Text style={styles.label}>IVA:</Text>
                <Text style={styles.text}>{data.IVA}</Text>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.text}>{data.Subtotal}</Text>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.text}>{data.Total}</Text>
                <Text style={styles.label}>Información del producto:</Text>
                <Text style={styles.text}>CPU: {prod.Cpu}</Text>
                <Text style={styles.text}>GPU: {prod.Gpu}</Text>
                <Text style={styles.text}>Almacenamiento: {prod.Almacenamiento}</Text>
                <Text style={styles.text}>Refrigeración: {prod.Refrigeracion}</Text>
                <Text style={styles.text}>Placa Madre: {prod.PlacaMadre}</Text>
                <Text style={styles.text}>Fuente de Alimentación: {prod.FuenteAlimentacion}</Text>
                <Text style={styles.text}>Gabinete: {prod.Gabinete}</Text>
                <Text style={styles.text}>Gama: {prod.Gama}</Text>
                    <Button label="Realizar Pedido" onPress={handleSubmit(onSubmit)} />
            </View>
        );
    };

    // NumProducto": 90,
    // "Producto": "null",
    // "Cpu": "AMD Ryzen 5 5600X",
    // "Gpu": "AMD Radeon RX 6700 XT",
    // "Almacenamiento": "WD Black SN750 NVMe SSD 1TB",
    // "Refrigeracion": "Cooler Master Hyper 212 RGB Black Edition",
    // "PlacaMadre": "MSI MPG B660 Gaming Plus",
    // "FuenteAlimentacion": "EVGA 650 B5, 80 Plus Bronze 650W Fully Modular",
    // "Gabinete": "Phanteks Eclipse P400A Mid Tower Case",
    // "Gama": "Media"
    
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Carrito de compras</Text>
                {getContent()}
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
        color: "#007bff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#0E46A3",
        textAlign: "justify",
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
    },
    boton: {
        alignSelf: 'flex-end',
        marginTop: 30,
        height: 60,
    }
});


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// import Button from "../../components/Button";
// import { useForm } from "react-hook-form";

// export default function Carrito({ route, navigation }){

//     const { formData } = route.params;

//     const [data, setData] = useState(null);
//     const [prod, setProd] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const {
//         handleSubmit,
//     } = useForm();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getPedidos.php?pedido=${formData.pedido.id}`);
//                 const pedidoData = await response.json();
//                 setData(pedidoData[0]);
                
//                 const productoResponse = await fetch(`https://pcbuilder4a.000webhostapp.com/api-rest/Productos/getProducto0.php?producto=${pedidoData[0].NumProducto}`);
//                 const productoData = await productoResponse.json();
//                 setProd(productoData[0]);

//                 setIsLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [formData.pedido.id]);

//     const onSubmit = async () => {
//         try {
//             const epResponse = await fetch(`https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/setEstadoPedido.php?estado=ESPER&pedido=${formData.pedido.id}`);
//             if (!epResponse.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             navigation.navigate('Pedidos', { userData: userData });
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const getContent = () => {
//         if (isLoading) {
//             return (
//                 <View style={styles.loadingContainer}>
//                     <Text>Loading Data...</Text>
//                     <ActivityIndicator size="large" />
//                 </View>
//             );
//         }
//         if (error) {
//             return <Text>{error.message}</Text>;
//         }

//         return (
          
            // <View style={styles.contentContainer}>
            //     <Text style={styles.label}>Pedido:</Text>
            //     <Text style={styles.text}>{formData.pedido.id}</Text>
            //     <Text style={styles.label}>Número de producto:</Text>
            //     <Text style={styles.text}>{data.NumProducto}</Text>
            //     <Text style={styles.label}>Cantidad:</Text>
            //     <Text style={styles.text}>{data.Cantidad}</Text>
            //     <Text style={styles.label}>IVA:</Text>
            //     <Text style={styles.text}>{data.IVA}</Text>
            //     <Text style={styles.label}>Subtotal:</Text>
            //     <Text style={styles.text}>{data.Subtotal}</Text>
            //     <Text style={styles.label}>Total:</Text>
            //     <Text style={styles.text}>{data.Total}</Text>
            //     <Text style={styles.label}>Información del producto:</Text>
            //     <Text style={styles.text}>CPU: {prod.Cpu}</Text>
            //     <Text style={styles.text}>GPU: {prod.Gpu}</Text>
            //     <Text style={styles.text}>Almacenamiento: {prod.Almacenamiento}</Text>
            //     <Text style={styles.text}>Refrigeración: {prod.Refrigeracion}</Text>
            //     <Text style={styles.text}>Placa Madre: {prod.PlacaMadre}</Text>
            //     <Text style={styles.text}>Fuente de Alimentación: {prod.FuenteAlimentacion}</Text>
            //     <Text style={styles.text}>Gabinete: {prod.Gabinete}</Text>
            //     <Text style={styles.text}>Gama: {prod.Gama}</Text>
            //         <Button label="Realizar Pedido" onPress={handleSubmit(onSubmit)} />
            // </View>
           
//         );
//     };

//     return(
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Carrito de Compras</Text>
//                 {getContent()}
//             </View>
//         </ScrollView>
      
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f0f0f0",
//         padding: 20,
//     },
//     title: {
//         fontSize: 30,
//         textAlign: "center",
//         marginBottom: 20,
//         color: "#007bff",
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     contentContainer: {
//         flex: 1,
//         alignItems: "flex-start",
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginBottom: 5,
//         color: "#0E46A3",
//         textAlign: "justify",
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 10,
//         textAlign: 'justify',
//     },
//     boton: {
//         alignSelf: 'flex-end',
//         marginTop: 30,
//         height: 60,
//     }
// });
