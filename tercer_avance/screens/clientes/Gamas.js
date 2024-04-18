// import React from "react";
// import {View, Text, StyleSheet} from 'react-native';
// import Button from "../../components/Button";
// import { useForm } from "react-hook-form";

// export default function Gamas ({navigation, route}) {

//     const { userData } = route.params ?? { userData: null };

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();
    
//     const onSubmit = data => {
//         navigation.navigate('Componentes', { formData: data });
//         console.log(data)
//     };

//     return (
//         <View>
//             <Text style={styles.Title}>Selecciona la gama que sera tu producto, {userData.nombre} </Text>
//             <form>
//                 <Text>Gama Alta</Text>
//                 <input type="radio" value="GAMA1" {...register("gama" , {required: true})} />
//                 <Text>{"\n"}</Text>
//                 <Text>Gama Media</Text>
//                 <input type="radio" value="GAMA2" {...register("gama" , {required: true})} />
//                 <Text>{"\n"}</Text>
//                 <Text>Gama Baja</Text>
//                 <input type="radio" value="GAMA3" {...register("gama" , {required: true})} />
//                 <Text>{"\n"}</Text>
//                 <Button label={"Continuar"} onPress={handleSubmit(onSubmit)} />
//             </form>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     Title: {
//         fontSize: 24,
//         textAlign: "center",
//         marginTop: "20%",
//     },
// });

import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

export default function Gamas({ navigation, route }) {
    const { userData } = route.params ?? { userData: null };

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const onSubmit = data => {
        navigation.navigate('Componentes', { formData: data , userData: userData});
        console.log(data)
    };

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.Title}>{userData.nombre}, selecciona la gama de producto que prefiera</Text>
                <View>
                    <RadioButton.Item 
                        label="Gama Alta" 
                        value="GAMA1" 
                        onPress={() => setValue("gama", "GAMA1")} 
                        status={watch("gama") === "GAMA1" ? 'checked' : 'unchecked'} 
                        style={styles.radioButton} // Agregar estilo al RadioButton
                        labelStyle={styles.radioButtonLabel} // Agregar estilo al texto del RadioButton
                    />
                    <Image source={require('../../assets/gamaAlta.webp')} style={styles.image} />
                    <Text style = {styles.texto} >{"\n El producto de gama alta ofrece un rendimiento excepcional, características innovadoras y materiales de primera calidad. Diseñado para satisfacer las necesidades de los consumidores más exigentes, este producto proporciona un desempeño superior, durabilidad excepcional y una experiencia de usuario incomparable con tecnología de vanguardia y un diseño elegante. "}</Text>
                    {/* <RadioButton.Item label="Gama Alta" value="GAMA1" onPress={() => setValue("gama", "GAMA1")} status={watch("gama") === "GAMA1" ? 'checked' : 'unchecked'} /> */}
                    
                </View>
                <View>
                    <RadioButton.Item 
                        label="Gama media" 
                        value="GAMA2" 
                        onPress={() => setValue("gama", "GAMA2")} 
                        status={watch("gama") === "GAMA2" ? 'checked' : 'unchecked'} 
                        style={styles.radioButton} // Agregar estilo al RadioButton
                        labelStyle={styles.radioButtonLabel} 
                    />
                    <Image source={require('../../assets/gamaMedia.webp')} style={styles.image} />
                    <Text style = {styles.texto}>{"\n El producto de gama media ofrece un equilibrio entre calidad y precio, brindando características y rendimiento sólidos a un costo accesible. Diseñado para satisfacer las necesidades de un amplio segmento de consumidores, este producto ofrece un buen desempeño, confiabilidad en un paquete atractivo y funcionalidades adecuadas y una construcción sólida."}</Text>
                </View>
                <View>
                    <RadioButton.Item 
                        label="Gama baja" 
                        value="GAMA3" 
                        onPress={() => setValue("gama", "GAMA3")} 
                        status={watch("gama") === "GAMA3" ? 'checked' : 'unchecked'} 
                        style={styles.radioButton} // Agregar estilo al RadioButton
                        labelStyle={styles.radioButtonLabel} 
                    />
                    <Image source={require('../../assets/gamaBaja.png')} style={styles.image} />
                    <Text style = {styles.texto}>{"\n El producto de gama baja ofrece una opción económica para aquellos con un presupuesto limitado. Aunque puede carecer de algunas características avanzadas y materiales de alta calidad, este producto proporciona funcionalidad básica a un precio accesible. Diseñado para satisfacer necesidades básicas, el producto de gama baja puede ser una opción adecuada para usuarios ocasionales o aquellos que priorizan el costo sobre las características adicionales. "}</Text>    
                </View>
                <View style = {styles.boton}>
                    <Button label="Continuar" onPress={handleSubmit(onSubmit)} />
                </View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Title: {
        marginTop:20,
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
        color: "#007bff",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: '-50%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
      },
    texto: {
        textAlign: 'justify',
        marginLeft: 15,
        marginRight: 15,
        //marginBottom:20
    },
    radioButton: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonLabel: {
        fontSize: 25,
        marginLeft: 10,
        textAlign: 'center',
        color: '#0E46A3',
    },
    boton: {
        marginTop: 30,
        height: 60,
    }
});