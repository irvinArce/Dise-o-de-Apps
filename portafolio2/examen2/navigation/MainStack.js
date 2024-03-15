import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Home from "../screens/Home";
import Uno from "../screens/Uno";
import Dos from "../screens/Dos";
import Tres from "../screens/Tres";
import Cuatro from "../screens/Cuatro";
import Cinco from "../screens/Cinco";
import Seis from "../screens/Seis";
import Siete from "../screens/Siete";

const Stack = createNativeStackNavigator();

export default function MainStack(){
    return(
       <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Uno" component={Uno} />
            <Stack.Screen name="Dos" component={Dos} />
            <Stack.Screen name="Tres" component={Tres} />
            <Stack.Screen name="Cuatro" component={Cuatro} />
            <Stack.Screen name="Cinco" component={Cinco} />
            <Stack.Screen name="Seis" component={Seis} />
            <Stack.Screen name="Siete" component={Siete} />
        </Stack.Navigator>
       </NavigationContainer>
    );
}