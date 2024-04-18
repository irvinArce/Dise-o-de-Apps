// import React from "react";
// import { View, Text, Pressable, StyleSheet } from "react-native";

// export default function Button({onPress, label, styles, textStyle}){
//     return (
//         <View>
//             <Pressable onPress={onPress} >
//                 <Text> {label} </Text>
//             </Pressable>
//         </View>
//     );
// }
// import React from "react";
// import { StyleSheet, Pressable, Text, View } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// export default function Button({ label, theme, onPress }) {
//   return (
//     <Pressable
//       style={[
//         styles.button,
//         theme === "primary" && styles.primaryButton,
//         theme === "primary" && { backgroundColor: "#007bff" },
//       ]}
//       onPress={onPress}
//     >
//       {theme === "primary" && (
//         <AntDesign name="shoppingcart" size={20} color="white" style={styles.icon} />
//       )}
//       <Text style={[styles.buttonText, theme === "primary" && styles.primaryText]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     backgroundColor: "#9AC8CD",
//     borderWidth: 0,
//   },
//   primaryButton: {
//     borderWidth: 0,
//   },
//   buttonText: {
//     color: "#000000",
//     fontSize: 14,
//   },
//   primaryText: {
//     color: "#FFFFFF",
//     marginLeft: 8,
//   },
//   icon: {
//     marginRight: 8,
//   },
// });

import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Button({ label, theme, onPress }) {
  return (
    <Pressable
      style={[
        styles.button,
        theme === "primary" && styles.primaryButton,
        theme === "primary" && { backgroundColor: "#007bff" },
      ]}
      onPress={onPress}
    >
      {theme === "primary" && (
        <AntDesign name="shoppingcart" size={20} color="white" style={styles.icon} />
      )}
      <Text style={[styles.buttonText, theme === "primary" && styles.primaryText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#0E46A3",
    borderWidth: 0,
  },
  primaryButton: {
    borderWidth: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  primaryText: {
    color: "#FFFFFF",
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});
