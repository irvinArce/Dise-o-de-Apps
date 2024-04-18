import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apePaterno, setApePaterno] = useState("");
  const [apeMaterno, setApeMaterno] = useState("");
  const [dirCalle, setDirCalle] = useState("");
  const [dirNumero, setDirNumero] = useState("");
  const [dirColonia, setDirColonia] = useState("");
  const [dirCP, setDirCP] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [numTel, setNumTel] = useState("");
  const [nombreFiscal, setNombreFiscal] = useState("");

  const handleRegister = async () => {
    try {
      const userData = {
        nombre,
        apePaterno,
        apeMaterno,
        dirCalle,
        dirNumero,
        dirColonia,
        dirCP,
        correo,
        contrasena,
        numTel,
        nombreFiscal,
        activacion: 1, // Valor predeterminado para activacion
        token: '20ec3eacb5e0f4d529db4446357bf43F', // Valor predeterminado para token
      };

      const response = await fetch("https://pcbuilder4a.000webhostapp.com/api-rest/Clientes/setCliente.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert("Registro", "¡Usuario registrado exitosamente!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.");
      console.error("Error de registro:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Registro de Usuario</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Apellido Paterno"
            value={apePaterno}
            onChangeText={(text) => setApePaterno(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Apellido Materno"
            value={apeMaterno}
            onChangeText={(text) => setApeMaterno(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Calle"
            value={dirCalle}
            onChangeText={(text) => setDirCalle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Número"
            value={dirNumero}
            onChangeText={(text) => setDirNumero(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Colonia"
            value={dirColonia}
            onChangeText={(text) => setDirColonia(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Código Postal"
            value={dirCP}
            onChangeText={(text) => setDirCP(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={correo}
            onChangeText={(text) => setCorreo(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={(text) => setContrasena(text)}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            placeholder="Número de Teléfono"
            value={numTel}
            onChangeText={(text) => setNumTel(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nombre Fiscal"
            value={nombreFiscal}
            onChangeText={(text) => setNombreFiscal(text)}
            style={styles.input}
          />
        </View>
        <Button title="Registrar" onPress={handleRegister} style={styles.button} />
        <View style={styles.loginButton}>
          <Button title="¿Ya tienes una cuenta? Inicia sesión" onPress={() => navigation.navigate("Login")} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E0342",
    marginBottom: 15,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 25, // Modificado para hacer los inputs más circulares
    borderWidth: 1,
    borderColor: "#0E46A3",
    fontSize: 16,
    color: "#1E0342",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0E46A3",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: "center",
  },
  loginButton: {
    marginTop: 10,
  },
});

export default RegisterScreen;