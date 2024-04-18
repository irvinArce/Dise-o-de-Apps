// import React from "react";
// import { View, Text, StyleSheet} from "react-native";
// import Button from "../../components/Button";

// const HomeScreen = ({ route, navigation }) => {
//   const { userData } = route.params ?? { userData: null }; // Proporcionar un valor predeterminado si route.params es undefined

//   //console.log(userData)

//   const onPress = () => {
//     navigation.navigate("Gamas", { userData: userData } );
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Bienvenido, {userData.nombre }!</Text>
//       <Text>Pulsa continuar para empezar a crear tu pedido</Text>
//       <Button label={"Continuar"} onPress={onPress} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//   },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import Button from "../../components/Button";
//import { green100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const HomeScreen = ({ route, navigation }) => {
  const { userData } = route.params ?? { userData: null };

  const onPress = () => {
    navigation.navigate("Gamas", { userData: userData });
  };

  // Rutas de imágenes de los productos
  const carousellImages = [
    require("../../assets/image2.jpg"),
    require("../../assets/image1.jpeg"),
    require("../../assets/image3.png"),
    // Agrega las rutas de las imágenes restantes aquí
  ];

  const productImages = [
    require("../../assets/compouno.png"),
    require("../../assets/compodos.png"),
    require("../../assets/compotres.png"),
    require("../../assets/compocuatro.png"),
    require("../../assets/compocinco.png"),
    require("../../assets/composeis.jpg"),
    require("../../assets/composiete.jpg"),
    require("../../assets/compoocho.png"),
    require("../../assets/componueve.png"),
    require("../../assets/com10.jpg"),
    require("../../assets/com11.jpg"),

  ];

  const productos = [
    { imagen: productImages[0], titulo: "" },
    { imagen: productImages[1], titulo: "" },
    { imagen: productImages[2], titulo: "" },
    { imagen: productImages[3], titulo: "" },
    { imagen: productImages[4], titulo: "" },
    { imagen: productImages[5], titulo: "" },
    { imagen: productImages[6], titulo: "" },
    { imagen: productImages[7], titulo: "" },
    { imagen: productImages[8], titulo: "" },
    { imagen: productImages[9], titulo: "" },
    { imagen: productImages[10], titulo:"" },
    { imagen: productImages[11], titulo: "" },
    // Aquí agregas los demás productos con sus títulos correspondientes
  ];

  // Ancho de la pantalla
  const screenWidth = Dimensions.get("window").width;

  return (
    <><View style={styles.head}>
      <Image source={require('../../assets/iconpc.png')} style={styles.logoImage} />
      <Text style={styles.textoHead}>PC BUILDER</Text>
    </View><ScrollView style={styles.container}>
        <View>
          {/* Carrusel de productos */}
          <ScrollView horizontal style={styles.carousel}>
            {carousellImages.map((image, index) => (
              <Image key={index} source={image} style={[styles.carouselImage, { width: screenWidth }]} />
            ))}
          </ScrollView>

          {/* Contenido principal */}

          <View style={styles.content}>
            <Text style={styles.texto}>¡Bienvenido, {userData.nombre}!</Text>
            <Text style={styles.textoAlt}>Realiza tu pedido</Text>
            <Button label={"Continuar"} onPress={onPress} />
          </View>

          {/* Catálogo de productos */}
          <View style={styles.catalog}>
            {productos.map((producto, index) => (
              <View key={index} style={styles.productContainer}>
                <Image source={producto.imagen} style={[styles.productThumbnail, { width: screenWidth / 2 - 15 }]} />
                <Text style={styles.productTitle}>{producto.titulo}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView></>
  );
};

export default HomeScreen;

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
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carousel: {
    maxHeight: 200,
  },
  carouselImage: {
    height: 200,
    resizeMode: "cover",
    marginHorizontal: 0,
  },
  content: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#E1F7F5",
    height: 180,
  },
  catalog: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,

  },
  productThumbnail: {
    height: 150,
    marginBottom: 10,
  },
  texto: {
    marginTop: 20,
    fontFamily: "Open Sans, sans-serif", // Agrega Open Sans como primera opción y sans-serif como alternativa
    color: "#0E46A3",
    fontSize: 40,
  },
  textoAlt : {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Open Sans, sans-serif",
  },
});
