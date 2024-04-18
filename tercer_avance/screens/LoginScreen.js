import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Animated, Easing } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [fadeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    fadeIn();
  }, []);

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
            navigation.navigate("MyTabs", { userData: user });
          } else if (selectedOption === "admin") {
            //navigation.navigate("AdminTabs");
            navigation.navigate("AdminTabs", { userData: user });

            // Navegar a la pantalla Home justo después
            // Usando setTimeout para esperar un poco antes de navegar
            // setTimeout(() => {
            //   navigation.navigate("AdminTabs", {
            //     screen: "Asignaciones", 
            //     params: { userData: user }
            //   });
            // }, 500); 
          } else if (selectedOption === "empleado") {
            navigation.navigate("EmpleadoTabs", {
              screen: "PerfilE",
              params: { userData: user }
            });
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

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.header, { opacity: fadeAnimation }]}>Inicio de Sesión</Animated.Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "cliente" && styles.selectedOption]}
          onPress={() => { setSelectedOption("cliente"); fadeIn(); }}
        >
          <Text style={styles.optionText}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "admin" && styles.selectedOption]}
          onPress={() => { setSelectedOption("admin"); fadeIn(); }}
        >
          <Text style={styles.optionText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === "empleado" && styles.selectedOption]}
          onPress={() => { setSelectedOption("empleado"); fadeIn(); }}
        >
          <Text style={styles.optionText}>Empleado</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    color: "#0E46A3",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: "#9AC8CD",
    borderRadius: 25,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#0E46A3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  selectedOption: {
    backgroundColor: "#1E0342",
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#0E46A3",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#0E46A3",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;