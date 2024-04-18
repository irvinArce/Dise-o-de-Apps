import React from "react";
import { useState } from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// NO se porque esta aqui pero ta aqui
import LoginScreen from "./screens/LoginScreen";

// CLIENTE
import HomeScreen from "./screens/clientes/HomeScreen";
import Pedidos from "./screens/clientes/Pedidos";

import Perfil from "./screens/clientes/Perfil";
import Gamas from "./screens/clientes/Gamas";
import Componentes from "./screens/clientes/Componentes";
import Gpu from "./screens/clientes/Gpu";
import Gabinete from "./screens/clientes/Gabinete";
import Placa from "./screens/clientes/Placa";
import Fuente from "./screens/clientes/Fuente";
import Refrigeracion from "./screens/clientes/Refrigeracion";
import Almacenamiento from "./screens/clientes/Almacenamiento";
import Cantidad from "./screens/clientes/Cantidad";
import Carrito from "./screens/clientes/Carrito";
import RegisterScreen from "./screens/RegisterScreen";

// EMPLEADO
import AsignacionScreen from "./screens/empleados/AsignacionesScreen";
import PerfilE from "./screens/empleados/Perfil";
import PerfilA from "./screens/administradores/PerfilA";

//ADMINISTRADORES
import InicioPedidos from "./screens/administradores/InicioPedidos";
import Ordenes from "./screens/administradores/Ordenes";
import VerOrdenes from "./screens/administradores/VerOrdenes";
import VerActividades from "./screens/administradores/VerActividades";

// import SettingsScreen from "./screens/SettingsScreen";

import Icon from 'react-native-vector-icons/FontAwesome';
import Actividades from "./screens/administradores/Actividades";

const StackNavigator = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation, route }) => {
    const { userData } = route.params ?? { userData: null };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Pedidos') {
                    iconName = 'file';
                } else if (route.name === 'Perfil') {
                    iconName = 'user';
                }

                return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen 
                name= "Home" 
                component={HomeScreen}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Inicio', headerShown: false }}
            />

            <Tab.Screen 
                name="Pedidos"
                component={Pedidos}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Mis Pedidos', headerShown: false }}
            />

            <Tab.Screen 
                name="Perfil" 
                component={Perfil}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Perfil', headerShown: false }}
            />
        </Tab.Navigator>
    );
};

const EmpleadoTabs = ({ navigation, route }) => {
    
    const { userData } = route.params ?? { userData: null };
    
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Asignaciones') {
            iconName = 'home';
        } else if (route.name === 'PerfilE') {
            iconName = 'user';
        }

        return <Icon name={iconName} size={size} color={color} />;
        },
    })}>
        <Tab.Screen name="Asignaciones" component={AsignacionScreen} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        <Tab.Screen name="PerfilE" component={PerfilE} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
};

const AdminTabs  = ({ navigation, route }) => {
    
    const { userData } = route.params ?? { userData: null };
    
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'InicioPedidos') {
                iconName = 'home';
            } else if (route.name === 'VerOrdenes') {
                iconName = 'file';
            } else if (route.name === 'VerActividades') {
                iconName = 'file';
            } else if (route.name === 'Perfil') {
                iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
            },
        })}>
        {/* <Tab.Screen name="Asignaciones" component={AsignacionScreen} /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        {/* <Tab.Screen name="InicioPedidos" component={InicioPedidos} />
        <Tab.Screen name="Perfil" component={Perfil} /> */}
            <Tab.Screen 
                name= "InicioPedidos" 
                component={InicioPedidos}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Inicio', headerShown: false }}
            />

            <Tab.Screen 
                name="VerOrdenes"
                component={VerOrdenes}
                icon = 'file'
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Ordenes', headerShown: false }}
            />

            <Tab.Screen 
                name="VerActividades"
                component={VerActividades}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Actividades', headerShown: false }}
            />

            <Tab.Screen 
                name="Perfil"
                component={PerfilA}
                initialParams={{ userData: userData }}
                options={{ tabBarLabel: 'Perfil', headerShown: false }}
            />

        </Tab.Navigator>
    );
};

function MyStack () {
    return (
        <StackNavigator.Navigator initialRouteName="Login">
            <StackNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Gamas" component={Gamas} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Componentes" component={Componentes} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Gpu" component={Gpu} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Gabinete" component={Gabinete} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Placa" component={Placa} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Almacenamiento" component={Almacenamiento} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Refrigeracion" component={Refrigeracion} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Fuente" component={Fuente} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Cantidad" component={Cantidad} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Carrito" component={Carrito} options={{ headerShown: true }} />
            {/* <StackNavigator.Screen name="Monitor" component={Monitor} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Mouse" component={Mouse} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Teclado" component={Teclado} options={{ headerShown: false }} /> */}
            <StackNavigator.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
            <StackNavigator.Screen name="EmpleadoTabs" component={EmpleadoTabs} options={{ headerShown: false }} />
            <StackNavigator.Screen name="AdminTabs" component={AdminTabs} options={{headerShown: false}} />
            <StackNavigator.Screen name="Ordenes" component={Ordenes} options={{headerShown: true}} />
            <StackNavigator.Screen name="Actividades" component={Actividades} options={{headerShown: true}} />
        </StackNavigator.Navigator>
    );
}

export default function Navigator(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}