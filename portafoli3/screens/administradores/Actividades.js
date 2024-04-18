import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Button from "../../components/Button";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { useForm } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import moment from 'moment';

export default function Actividades({route, navigation}) {

    const { userData } = route.params ?? { userData: null };
    const { formData } = route.params ?? { formData: null };

    const [act, setAct] = useState(null);
    const [ped, setPed] = useState(null);
    const [emp, setEmp] = useState(null);
    const [roles, setRoles] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());
    const [horaInicio, setHoraInicio] = useState(new Date());
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [actividad, setActividad] = useState(null);
    const [empleado, setEmpleado] = useState(null);
    const [rol, setRol] = useState(null);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

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

    const showFechaInicio = async () => {
        try {
            const { action, year, month, day } = await DateTimePickerAndroid.open({
                value: dateFinal || new Date(),
            });
    
            if (action !== DateTimePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                setFechaInicio(selectedDate);
            }
        } catch (error) {
            console.error('Error mostrando el selector de fecha', error);
        }
    };

    useEffect(() => {
        const actURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Actividades/getActividades.php?orden="+formData.orden;
        const pedURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Pedidos/getPedidos.php?pedido="+formData.pedido;
        const empURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Empleados/getEmpleados.php";
    
        Promise.all([fetch(actURL).then(response => response.json()), fetch(pedURL).then(response => response.json()), fetch(empURL).then(response => response.json())])
            .then(([act, ped, emp]) => {
                setAct(act);
                setPed(ped);
                setEmp(emp);
                console.log(emp);
                // setIsLoading(false);
                const rolURL = "https://pcbuilder4a.000webhostapp.com/api-rest/Roles/getRoles.php?area="+act[0].area;
                console.log(rolURL)
                fetch(rolURL)
                .then(response => response.json())
                .then(result => {
                    setRoles(result);
                    setIsLoading(false);
                }, error => {
                    setIsLoading(false);
                    setError(error);
                })
            }, error => {
                setIsLoading(false);
                setError(error);
            })
    },  []);

    const onSubmit = (datas) => {
        console.log("DATA - ACT")
        console.log(datas)
        const date = moment(date).format('YYYY/MM/DD');
        const dateFinal = moment(dateFinal).format('YYYY/MM/DD');
        const array = { ...formData, fechaI: fechaInicio, actividad: actividad, fechaInicio: date, fechaFinal: dateFinal, producto: datas.producto, empleado: empleado, rol: rol }
        console.log(array)
        const setact = "https://pcbuilder4a.000webhostapp.com/api-rest/Actividades/setActividades.php?"+
        "orden="+array.nuevaOrden.id+"&actividad="+array.actividad+"&admin="+userData.matricula+"&fechaInicio="+array.fechaInicio+"&fechaFinal="+array.fechaFinal;
        Promise.all([
            fetch(setact)
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
        .then(([act]) => {
            // navigation.navigate('Pedidos', { userData: userData });
            console.log(act);
            const ar = { act: act }
            const fechaI = moment(array.fechaI).format('YYYY/MM/DD');
            const setAP = "https://pcbuilder4a.000webhostapp.com/api-rest/Act_Prod/setActividadesProductos.php?actividad="+act.id+"&producto="+array.producto;
            const setAsig = "https://pcbuilder4a.000webhostapp.com/api-rest/Asignaciones/setAsignaciones.php"+
            "?fechaInicio="+fechaI+"&horaInicio=00:00&empleado="+array.empleado+"&actividad="+act.id+"&rol="+array.rol;
            console.log(setAsig)
            console.log(setAP)
            Promise.all([
                fetch(setAP)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error fetching CPU:', error);
                    }),
                fetch(setAsig)
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
            .then(([ap, asig]) => {
                // navigation.navigate('Pedidos', { userData: userData });
                const setEA = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_asig/setEstado_asig.php?estado=ESPER&asignacion="+asig.id;
                const setEAE = "https://pcbuilder4a.000webhostapp.com/api-rest/Estado_act/setEstadoActEspera.php?actividad="+ar.act.id;
                console.log(setEAE)
                Promise.all([
                    fetch(setEA)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error('Error fetching CPU:', error);
                        }),
                    fetch(setEAE)
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
                    navigation.navigate('InicioPedidos', { userData: userData });
                })
            })
        })
    }

    // $data = array(
    //     "fechaInicio" => $this->fechaInicio,
    //     "horaInicio" => $this->horaInicio,
    //     "empleado" => $this->empleado,
    //     "actividad" => $this->actividad,
    //     "rol" => $this->rol
    // );

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
            <View style={styles.container}>
                <Text style={styles.label}>Trabajando en pedido:</Text>
                <Text >{formData.pedido.id}</Text>
                <Text style={styles.label}>Orden:</Text>
                <Text >{formData.nuevaOrden.id} </Text>
                <Text style={styles.label}>Orden a realizar:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setActividad(value)}
                    items={act.map(item => ({
                        label: item.nombre,
                        value: item.numero,
                        key: item.numero.toString() // Asigna una clave única
                    }))}
                />
                <Button label="Seleccionar fecha de inicio de la actividad" onPress={showDatePicker} />
                <Text> {"\n"} </Text>
                <Button label="Seleccionar fecha final de la actividad" onPress={showFechaFinal} />
                <Text> {"\n"} </Text>
                <Text style={styles.label}>Producto al que se le aplicara la orden:</Text>
                <FlatList
                    data={ped}
                    renderItem={({ item }) => (
                        <View style={styles.radio}>
                            <RadioButton.Item
                                label={"Numero de producto: " + item.NumProducto}
                                value={item.NumProducto}
                                onPress={() => setValue("producto", item.NumProducto)}
                                status={watch("producto") === item.NumProducto ? 'checked' : 'unchecked'}
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text> {"\n"} </Text>
                <Text style={styles.label}> ASIGNACION DE EMPLEADO A ACTIVIDAD </Text>
                <Text style={styles.label}>Selecciona al empleado:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setEmpleado(value)}
                    items={emp.map(item => ({
                        label: item.nombre + " " + item.apePaterno + " " + item.apeMaterno ,
                        value: item.matricula,
                        key: item.matricula.toString() // Asigna una clave única
                    }))}
                />
                <Text> {"\n"} </Text>
                <Text style={styles.label}>Rol que designara el empleado:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setRol(value)}
                    items={roles.map(item => ({
                        label: item.nombre,
                        value: item.codigo,
                        key: item.codigo.toString() // Asigna una clave única
                    }))}
                />
                <Button label="Selecciona la fecha de inicio de la asignacion" onPress={showFechaInicio} />
                <Text> {"\n"} </Text>
                <Button label="Realizar Pedido" onPress={handleSubmit(onSubmit)} />
            </View>
        );
    };

    return(
        <View style={styles.container}>
            {getContent()}
        </View>
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
    radio: {
        marginVertical: 5,
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