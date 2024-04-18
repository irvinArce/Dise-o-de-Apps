import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, Alert} from 'react-native';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { RadioButton } from 'react-native-paper';

export default function Gabinete({route, navigation}){

    const { userData } = route.params;
    const { formData } = route.params;

    const url = "https://pcbuilder4a.000webhostapp.com/api-rest/Componentes/getAllComponentes.php?componente=gabinete&gama="+formData.gama;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const onSubmit = (data) => {
        if (!data.gabinete) {
            Alert.alert('Campo requerido', 'Por favor selecciona una opcion');
            return;
        }
        const array = { ...formData, ...data };
        navigation.navigate('Placa', { formData: array , userData: userData});
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
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.radio}>
                        <RadioButton.Item
                            label={item.nombre}
                            value={item.numero}
                            onPress={() => setValue("gabinete", item.numero)}
                            status={watch("gabinete") === item.numero ? 'checked' : 'unchecked'}
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
    
    return(
        <View style={styles.container}>
            <Text style={styles.Title}>Selecciona el Gabinete</Text>
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



// export default function Componentes ({route}) {

//   const { formData } = route.params;

//   const url = "";
//   const url2 = "";
//   const url3 = "https://pcbuilder4a.000webhostapp.com/api-rest/Componentes/getAllComponentes.php?componente=cpu&gama="+formData.gama;

//   const {
//       register,
//       handleSubmit,
//       formState: { errors },
//   } = useForm();

//   const [cpu, setCpu] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url3);
//         setCpu(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const onSubmit = (data) => {
//       axios.post(url, {
//       // data - lo que viene del formulario
//       cliente: data.cliente
//       })
//   };

//   return (
//       <View>
//           <Text>Selecciona los componentes de tu producto</Text>
//           {/* {Object.keys(cpu).map((key) => (
//               <View key={key}>
//                   <Text>{get[key].nombre}</Text>
//                   <Button onPress={handleSubmit} label={get[key].numero} />
//               </View>
//           ), console.log(cpu))} */}
//           <FlatList 
//                   showsVerticalScrollIndicator={false}
//                   data = {data}
//                   renderItem={ ({item}) => (
//                       <View>
//                           <Text> {item.name} </Text>
//                           <Text>Stock: {item.genus}  </Text>
//                       </View>
//                   )}
//               />
//       </View>
//     );
// };