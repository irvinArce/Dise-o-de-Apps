import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text as RNText } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleLogin = () => {
    if (!selectedOption) {
      Alert.alert("Error", "Selecciona una opción antes de iniciar sesión.");
      return;
    }

    let apiUrl = "";
    if (selectedOption === "cliente") {
      apiUrl = "https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getCliente.php";
    } else if (selectedOption === "admin") {
      apiUrl = "https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getAdmin.php";
    } else if (selectedOption === "empleado") {
      apiUrl = "https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getEmpleado.php";
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.correo === email && user.contrasena === password);
        if (user) {
          if (selectedOption === "cliente") {
            //navigation.navigate("ClienteTabs");
             //Navegar a la pantalla Perfil
          navigation.navigate("ClienteTabs", {
            screen: "Perfil",
            params: { userData: user }
          });

          // Navegar a la pantalla Home justo después
          // Usando setTimeout para esperar un poco antes de navegar
          // setTimeout(() => {
          //   navigation.navigate("ClienteTabs", {
          //     screen: "Asignaciones", 
          //     params: { userData: user }
          //   });
          // }, 500); 

          } else if (selectedOption === "admin") {
            //navigation.navigate("AdminTabs");
            navigation.navigate("AdminTabs", {
              screen: "Perfil",
              params: { userData: user }
            });
  
            // Navegar a la pantalla Home justo después
            // Usando setTimeout para esperar un poco antes de navegar
            // setTimeout(() => {
            //   navigation.navigate("AdminTabs", {
            //     screen: "Asignaciones", 
            //     params: { userData: user }
            //   });
            // }, 500); 

          } else if (selectedOption === "empleado") {
            //navigation.navigate("EmpleadoTabs");
            navigation.navigate("EmpleadoTabs", {
              screen: "Perfil",
              params: { userData: user }
            });
  
            // Navegar a la pantalla Home justo después
            // Usando setTimeout para esperar un poco antes de navegar
            setTimeout(() => {
              navigation.navigate("EmpleadoTabs", {
                screen: "Asignaciones", 
                params: { userData: user }
              });
            }, 500); 

          }
        } else {
          Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
        }
      })
      .catch(error => {
        Alert.alert("Error", "Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.");
        console.error("Error fetching data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "cliente" && styles.selectedOption]}
          onPress={() => setSelectedOption("cliente")}
        >
          <RNText style={styles.optionText}>Cliente</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "admin" && styles.selectedOption]}
          onPress={() => setSelectedOption("admin")}
        >
          <RNText style={styles.optionText}>Admin</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "empleado" && styles.selectedOption]}
          onPress={() => setSelectedOption("empleado")}
        >
          <RNText style={styles.optionText}>Empleado</RNText>
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedOption: {
    backgroundColor: "blue",
  },
});

export default LoginScreen;
// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
// //import Perfil from "./Perfil";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Lógica de verificación de inicio de sesión...
//       fetch("https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getEmpleado.php")
//     //fetch("https://pcbuilder4a.000webhostapp.com/api-rest/Administradores/getCliente.php")
//       .then(response => response.json())
//       .then(data => {
//         // Verificar si el correo electrónico y la contraseña existen en la API
//         const user = data.find(user => user.correo === email && user.contrasena === password);
//         if (user) {
//           // Inicio de sesión exitoso, navegar a la pantalla principal
//           //navigation.navigate('MainTabs', { screen: Perfil , userData: user});
//           // Navegar a la pantalla Perfil
//           navigation.navigate("MainTabs", {
//             screen: "Perfil",
//             params: { userData: user }
//           });

//           // Navegar a la pantalla Home justo después
//           // Usando setTimeout para esperar un poco antes de navegar
//           setTimeout(() => {
//             navigation.navigate("MainTabs", {
//               screen: "Asignaciones", 
//               params: { userData: user }
//             });
//           }, 500); 
          
          
//           // navigation.navigate("MainTabs", { 
//           //   screen: "Perfil", 
//           //   params: { 
//           //     userData: user,
//           //     matricula: user.matricula // Pasar la matrícula como parámetro
//           //   } 
//           // });
//           //navigation.navigate("MainTabs");
//         } else {
//           // Correo electrónico o contraseña incorrectos, mostrar un mensaje de error
//           Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
//         }
//       })
//       .catch(error => {
//         // Error al cargar datos de la API, mostrar un mensaje de error
//         Alert.alert("Error", "Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.");
//         console.error("Error fetching data:", error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Input para el correo electrónico */}
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         style={styles.input}
//       />
//       {/* Input para la contraseña */}
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry={true}
//         style={styles.input}
//       />
//       {/* Botón de inicio de sesión */}
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     width: "80%",
//     marginBottom: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//   },
// });

// export default LoginScreen;