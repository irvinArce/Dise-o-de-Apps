import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { RadioButton, TextInput } from 'react-native-paper';
import axios from 'axios';

export default function Fuente({ route, navigation }) {

    const { userData } = route.params;
    const { formData } = route.params;

    console.log(userData)
    console.log(formData)

    // const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Componentes/getAllComponentes.php?componente=fuenteAlimentacion&gama=" + formData.gama;

    const {
        handleSubmit,
        watch,
    } = useForm();

    const [cantidad, setCantidad] = useState("");

    // useEffect(() => {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(result => {
    //             setIsLoading(false);
    //             setData(result);
    //         })
    //         .catch(error => {
    //             setIsLoading(false);
    //             setError(error);
    //         });
    // }, []);
    const onSubmit = (data) => {
        data = cantidad;
        if (cantidad.trim() === '') {
            Alert.alert('Campo requerido', 'Por favor ingresa una cantidad');
            return;
        }
        console.log(data)
        const pedidosURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/setPedidos.php?cliente=" + userData.numero;
        const productosURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Productos/setProducto.php?nombre=null";
        Promise.all([
            fetch(pedidosURL).then(response => {
                return response.json();
            }),
            fetch(productosURL).then(response => {
                return response.json();
            })
        ])
        .then(([pedidosResult, productosResult]) => {
            const array = { ...formData, cantidad: data, pedido: pedidosResult, producto: productosResult }
            const cpu = "https://pcbuilder4a.000webhostapp.com/api-rest/Cpu_prod/setComCpu.php?codigo="+array.producto.id+"&cpu="+array.cpu;
            const gpu = "https://pcbuilder4a.000webhostapp.com/api-rest/Gpu_Prod/setComGpu.php?codigo="+array.producto.id+"&gpu="+array.gpu;
            const gabinete = "https://pcbuilder4a.000webhostapp.com/api-rest/Gabinete_Prod/setComGabinete.php?codigo="+array.producto.id+"&gabinete="+array.gabinete;
            const placa = "https://pcbuilder4a.000webhostapp.com/api-rest/Placa_prod/setComPlaca.php?codigo="+array.producto.id+"&placa="+array.placa;
            const almacenamiento = "https://pcbuilder4a.000webhostapp.com/api-rest/Almacenamiento_prod/setComAlmacenamiento.php?codigo="+array.producto.id+"&almacenamiento="+array.almacenamiento;
            const refrigeracion = "https://pcbuilder4a.000webhostapp.com/api-rest/Refrigeracion_prod/setComRefrigeracion.php?codigo="+array.producto.id+"&refrigeracion="+array.refrigeracion;
            const fuente = "https://pcbuilder4a.000webhostapp.com/api-rest/Fuente_prod/setComFuenteAlimentacion.php?codigo="+array.producto.id+"&fuenteAlimentacion="+array.fuente;
            const ped_prod = "https://pcbuilder4a.000webhostapp.com/api-rest/Ped_prod/setPed_Prod.php?pedido="+array.pedido.id+"&producto="+array.producto.id+"&cantidad="+array.cantidad;
            console.log("Data:")
            console.log(array)
            Promise.all([
                fetch(cpu)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching CPU:', error);
                    }),
                fetch(gpu)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching GPU:', error);
                    }),
                fetch(gabinete)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching GABINETE:', error);
                }),
                fetch(placa)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching PLACA:', error);
                }),
                fetch(almacenamiento)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching ALMACENAMIENTO:', error);
                }),
                fetch(refrigeracion)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching REFRIGERACION:', error);
                }),
                fetch(fuente)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching FUENTE:', error);
                }),
                fetch(ped_prod)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching PED_PROD:', error);
                }),
            ])
            // .then(([cpuResult, gpuResult, gabineteResult, placaResult, almacenamientoResult, refrigeracionResult, fuenteResult]) => {
            .then(() => {
                console.log("Todo se logro")
                console.log(array)
                const cpuPrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/Cpu/precioCpu.php?cpu="+array.cpu;
                const gpuPrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/Gpu/precioGpu.php?gpu="+array.gpu;
                const gabinetePrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/Gabinete/precioGabinete.php?gabinete="+array.gabinete;
                const placaPrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/PlacaMadre/precioPlaca.php?placa="+array.placa;
                const almacenamientoPrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/Almacenamiento/precioAlmacenamiento.php?almacenamiento="+array.almacenamiento;
                const refrigeracionPrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/Refrigeracion/precioRefrigeracion.php?refrigeracion="+array.refrigeracion;
                const fuentePrecio = "https://pcbuilder4a.000webhostapp.com/api-rest/FuenteAlimentacion/precioFuenteAlimentacion.php?fuenteAlimentacion="+array.fuente;
                // navigation.navigate('Carrito', { formData: array, userData: userData });
                Promise.all([
                    fetch(cpuPrecio)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error('Error fetching CPU:', error);
                        }),
                    fetch(gpuPrecio)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error('Error fetching GPU:', error);
                        }),
                    fetch(gabinetePrecio)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching GABINETE:', error);
                    }),
                    fetch(placaPrecio)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching PLACA:', error);
                    }),
                    fetch(almacenamientoPrecio)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching ALMACENAMIENTO:', error);
                    }),
                    fetch(refrigeracionPrecio)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching REFRIGERACION:', error);
                    }),
                    fetch(fuentePrecio)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching FUENTE:', error);
                    }),
                ])
                .then(([cpu, gpu, gabinete, placa, almacenamiento, refrigeracion, fuente]) => {
                    const precio = cpu[0].precioUnitario + gpu[0].precioUnitario + gabinete[0].precioUnitario + placa[0].precioUnitario + almacenamiento[0].precioUnitario + refrigeracion[0].precioUnitario + fuente[0].precioUnitario
                    var manoObra = 0;
                    if(array.gama === "GAMA1"){
                        manoObra = 4999.99;
                    } else if(array.gama === "GAMA2"){
                        manoObra = 2999.99;
                    } else if(array.gama === "GAMA2"){
                        manoObra = 999.99;
                    }
                    const costoProd = precio + manoObra;
                    const precioUnitario = (precio * 0.40) + costoProd;
                    const importe = precioUnitario * array.cantidad;
                    const montoTotal = importe;
                    const subtotal = montoTotal / 1.16;
                    const iva = subtotal * 0.16;
                    const upPedidos = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/updatePrecios.php?pedido="+array.pedido.id+"&montoTotal="+montoTotal+"&subtotal="+subtotal+"&iva="+iva;
                    const upProductos = "https://pcbuilder4a.000webhostapp.com/api-rest/Productos/updatePrecios.php?costoProd="+costoProd+"&precioUnitario="+precioUnitario+"&producto="+array.producto.id;
                    const upPP = "https://pcbuilder4a.000webhostapp.com/api-rest/Ped_prod/updatePrecios.php?importe="+importe+"&pedido="+array.pedido.id+"&producto="+array.producto.id;
                    Promise.all([
                        fetch(upPedidos)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .catch(error => {
                                console.error('Error fetching CPU:', error);
                            }),
                        fetch(upProductos)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .catch(error => {
                                console.error('Error fetching GPU:', error);
                            }),
                        fetch(upPP)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error('Error fetching GABINETE:', error);
                        }),
                    ])
                    .then(() => {
                        navigation.navigate('Carrito', { formData: array, userData: userData });
                    })
                })
            })
            // navigation.navigate('Carrito', { formData: array, userData: userData });
        })
    };

    const getContent = () => {
        return (
            <View>
                <Text style={styles.Title} > Ingresa la cantidad de productos deseados (min 10) </Text>
                    <TextInput 
                        placeholder="Cantidad"
                        value={cantidad} // Usando el valor del estado para controlar el input
                        onChangeText={(text) => setCantidad(text)} // Usando setCantidad para actualizar el estado
                        style={styles.input} 
                    />
                <View style = {styles.boton}>
                    <Button label="Continuar al carrito" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* <Text style={styles.Title}>Selecciona la Fuente de Alimentacion</Text> */}
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
    boton: {
        marginTop: 30,
        height: 60,
    }, 
    texto: {
        textAlign: 'justify',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom:10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#fff", // Inicialmente blanco
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    inputFocused: {
        borderColor: "#007bff", // Cuando se enfoca, cambia a azul
    },
});