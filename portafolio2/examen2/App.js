import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Arce Llamas Irvin de Jesus 4A</Text>
      <MainStack />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});