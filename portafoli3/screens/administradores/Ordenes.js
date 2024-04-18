// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import Button from "../../components/Button";
// // import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import RNPickerSelect from 'react-native-picker-select';
// import { useForm } from "react-hook-form";

// export default function Ordenes ({route, navigation}) {

//     const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Ordenestrabajo/getOrdenTrabajo.php";
    
//     const { userData } = route.params ?? { userData: null };
//     const { formData } = route.params ?? { formData: null };

//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [date, setDate] = useState(new Date());
//     const [dateFinal, setDateFinal] = useState(new Date());

//     // const showDatePicker = async () => {
//     //     try {
//     //         const result = await DateTimePickerAndroid.open({
//     //             value: {},
//     //         });
//     //         console.log(date)
//     //         console.log(result)
//     //         if (result && result.action !== DateTimePickerAndroid.dismissedAction) {
//     //             const { year, month, day } = result;
//     //             const selectedDate = new Date(year, month, day);
//     //             setDate(selectedDate);
//     //             console.log(selectedDate)
//     //         } else {
//     //             console.log("NO funciona")
//     //         }
//     //     } catch (error) {
//     //         console.error('Error mostrando el selector de fecha', error);
//     //     }
//     // };

//     const showDatePicker = async () => {
//         try {
//             const { action, year, month, day } = await DateTimePickerAndroid.open({
//                 value: date || new Date(),
//             });
        
//             if (action !== DateTimePickerAndroid.dismissedAction) {
//                 const selectedDate = new Date(year, month, day);
//                 setDate(selectedDate);
//             } else {
//                 console.log("Selector de fecha cancelado");
//             }
//         } catch (error) {
//             console.error('Error mostrando el selector de fecha', error);
//         }
//     };
    
//     const showFechaFinal = async () => {
//         try {
//             const { action, year, month, day } = await DateTimePickerAndroid.open({
//                 value: dateFinal || new Date(),
//             });
    
//             if (action !== DateTimePickerAndroid.dismissedAction) {
//                 const selectedDate = new Date(year, month, day);
//                 setDateFinal(selectedDate);
//             }
//         } catch (error) {
//             console.error('Error mostrando el selector de fecha', error);
//         }
//     };

//     const {
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//     } = useForm();

//     useEffect( () => {
//         fetch(url)
//         .then(response => response.json())
//         .then(result => {
//             setIsLoading(false);
//             setData(result);
//         }, error => {
//             setIsLoading(false);
//             setError(error);
//         })
//     } , []);

//     const onPress = (value) => {
//         console.log(formData)
//         const array = { ...formData, ...value, ...date, ...dateFinal }
//         console.log("ARRAY")
//         console.log(array)
//     }

//     const getContent = () => {
//         if(isLoading){
//             return(
//                 <View>
//                     <Text style={styles.textProps}> Loading Data... </Text>
//                     <ActivityIndicator size="large" />
//                 </View>
//             );
//         }
//         if(error){
//             return <Text style={styles.text}> {error} </Text>
//         }

//         return (
//             <View>
//                 <Text> Nueva orden de trabajo </Text>
//                 <Text> Se asignara orden de trabajo a pedido: {formData.pedido} </Text>
//                 <RNPickerSelect
//                     onValueChange={(value) => setValue(value)}
//                     items={data.map(item => ({
//                         label: item.detalles,
//                         value: item.numero,
//                         key: item.numero.toString() // Asigna una clave única
//                     }))}
//                     value={""}
//                 />
//                 <Button label="Seleccionar fecha de inicio" onPress={showDatePicker} />
//                 <Button label="Seleccionar fecha final" onPress={showFechaFinal} />
//                 <Text> {"\n"} </Text>
//                 <Text> Informacion del administrador </Text>
//                 <Text> Matricula: {userData.matricula} </Text>
//                 <Text> Nombre: {userData.nombre} </Text>
//                 <Text> {"\n"} </Text>
//                 <Button label="Asignar orden" onPress={handleSubmit(onPress)} />
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {getContent()}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     Title: {
//         fontSize: 30,
//         textAlign: "center",
//         marginTop: "20%",
//     },
//     // cont: {
//     //     paddingBottom: 100,
//     // },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Button from "../../components/Button";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { useForm } from "react-hook-form";
import moment from 'moment';

export default function Ordenes ({route, navigation}) {

    const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Ordenestrabajo/getOrdenTrabajo.php";
    
    const { userData } = route.params ?? { userData: null };
    const { formData } = route.params ?? { formData: null };

    const [data, setData] = useState([]);
    const [ordenes, setOrdenes] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());

    const showDatePicker = async () => {
        try {
            const { action, year, month, day } = await DateTimePickerAndroid.open({
                value: date || new Date(),
            });
        
            if (action !== DateTimePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                setDate(selectedDate);
            } else {
                console.log("Selector de fecha cancelado");
            }
        } catch (error) {
            console.error('Error mostrando el selector de fecha', error);
        }
    };
    
    const showFechaFinal = async () => {
        try {
            const { action, year, month, day } = await DateTimePickerAndroid.open({
                value: dateFinal || new Date(),
            });
    
            if (action !== DateTimePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                setDateFinal(selectedDate);
            }
        } catch (error) {
            console.error('Error mostrando el selector de fecha', error);
        }
    };

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    useEffect( () => {
        fetch(url)
        .then(response => response.json())
        .then(result => {
            setIsLoading(false);
            setData(result);
        }, error => {
            setIsLoading(false);
            setError(error);
        })
    } , []);

    const onPress = () => {
        const date = moment(date).format('YYYY/MM/DD');
        const dateFinal = moment(dateFinal).format('YYYY/MM/DD');
        console.log("Alla vamos")
        const array = { ...formData, orden: ordenes, startDate: date, endDate: dateFinal };
        const ordenURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Ordenestrabajo/setOrdenTrabajo.php?orden="+array.orden+"&pedido="+array.pedido+"&admin="+userData.matricula+"&fechaInicio="+array.startDate+"&fechaFinal="+array.endDate;
        const adminURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/setAdministrador.php?administrador="+userData.matricula+"&pedido="+formData.pedido;
        Promise.all([
            fetch(ordenURL).then(response => {
                return response.json();
            }),
            fetch(adminURL).then(response => {
                return response.json();
            })
        ])
        .then(([orden, admin]) => {
            const array = { ...formData, nuevaOrden: orden, orden: ordenes}
            console.log("ARRAY")
            console.log(array)
            console.log("FORMDATA")
            console.log(formData)
            const setEO = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_orden/setEstadoOrden.php?estado=PROCE&orden="+array.nuevaOrden.id;
            const setEP = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_ped/setEstadoPedido.php?estado=PROCE&pedido="+array.pedido;
            console.log(setEP)
            Promise.all([
                fetch(setEO)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching EO:', error);
                    }),
                fetch(setEP)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching EP:', error);
                    }),
            ])
            // .then(([cpuResult, gpuResult, gabineteResult, placaResult, almacenamientoResult, refrigeracionResult, fuenteResult]) => {
            .then(() => {
                console.log("Todo se logro")
                console.log(array)
                navigation.navigate('Actividades', { formData: array, userData: userData });
            })
            // navigation.navigate('Carrito', { formData: array, userData: userData });
        })
    }

    // $url = "https://pcbuilder4a.000webhostapp.com/api-rest/Ordenestrabajo/setOrdenTrabajo.php";
    //     $data = array(
    //         "orden" => $this->orden,
    //         "pedido" => $this->pedido,
    //         "admin" => $this->administrador,
    //         "fechaInicio" => $this->fechaInicio,
    //         "fechaFinal" => $this->fechaFin
    //     );
    //     $response = $curl->post($url, $data);
    //     return $response;

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
            <View>
                <Text style = {styles.Title}> Nueva orden de trabajo </Text>
                <Text>        Se asignara orden de trabajo a pedido: {formData.pedido} </Text>
                <View style = {styles.boton}>
                <RNPickerSelect
                    onValueChange={(value) => setOrdenes(value)}
                    items={data.map(item => ({
                        label: item.detalles,
                        value: item.numero,
                        key: item.numero.toString() // Asigna una clave única
                    }))}
                />
                </View>
                <View style = {styles.boton}>
                <Button label="Seleccionar fecha de inicio" onPress={showDatePicker} />
                </View>
                 <Text> {"\n"} </Text>
                <View style ={styles.boton}>
                <Button label="Seleccionar fecha final" onPress={showFechaFinal} />
                </View>
                <Text> {"\n"} </Text>
                <Text style = {styles.label} >          Informacion del administrador </Text>
                <View style={styles.info}>
                <Text style={styles.label}>       Matricula:</Text>
                <Text style={styles.text}>{userData.matricula}</Text>
                <Text style={styles.label}>       Nombre:</Text>
                <Text style={styles.text}>{userData.nombre}</Text>
                </View>
                {/* <Text> Matricula: {userData.matricula} </Text> */}
                {/* <Text> Nombre: {userData.nombre} </Text> */}
                <Text> {"\n"} </Text>
                <View style = {styles.boton}>
                    <Button label="Asignar orden" onPress={handleSubmit(onPress)} />    
                </View>
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
        
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        fontWeight:"bold",
        textAlign:"center",
        
    },
    // boton: {
    //     marginTop: 30,
    //     height: 60,
    // }, 
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        
        color: '#0E46A3',
        justifyContent: "center",
        // Cada columna toma la mitad del espacio disponible
        paddingHorizontal: 8, 
    },
    text: {
        fontSize: 14,
        color: '#333333',
        
    },
    info:{
        paddingTop:20,
        flexDirection:"row"
    }
    // cont: {
    //     paddingBottom: 100,
    // },
});