import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import React from 'react';
import { Text, View, SafeAreaView, Button, StyleSheet } from 'react-native';

//--------   Hivatkozások   --------\\
import Orszag from './Orszag'
import Varos from './Varos'
import Felvitel from './Felvitel'
import Lenyilo from './Lenyilo'
import KozosScreen from './KozosScreen'
import Ujlap from './Ujlap'
import Video from './Video'
import Nevjegy from './Nevjegy'
import KeresesSzoveg from './KeresesSzoveg'
import Ipcim from './Ipcim';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MasodikHomeScreen({ navigation }) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(Ipcim.Ipcim+"Orszag");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <View style={{ backgroundColor: '#c5fffc'}}>
      <SafeAreaView />
      <Text 
        style={{
          fontSize: 40,
          paddingTop: 30,
          paddingBottom: 10,
          marginLeft: 20
        }}>
        Országok
      </Text>

    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.notificationsscreen}>
      <Button onPress={() => navigation.goBack()} title="Vissza a főoldalra" />
    </View>
  );
}

function Orszag_megjelenites({ navigation }) {
  return <Orszag />;
}

function Varos_megjelenites({ navigation }) {
  return <Varos />;
}

function Root({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'lightgreen',
          color: 'red',
        },
        headerShown: true,
      }}
      initialRouteName="Főoldal">
      <Drawer.Screen name="Főoldal" component={MasodikHomeScreen} />
      <Drawer.Screen name="Országok" component={Orszag_megjelenites} />
      <Drawer.Screen name="Felvitel" component={Felvitel} />
      <Drawer.Screen name="Lenyilo" component={Lenyilo} />
      <Drawer.Screen name="KözösScreen" component={KozosScreen} />
      <Drawer.Screen name="Videó" component={Video} />
      <Drawer.Screen name="Névjegy" component={Nevjegy} />
      <Drawer.Screen name="KeresésSzöveg" component={KeresesSzoveg} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Vissza" component={Root} options={{ headerShown: false }} />
        <Stack.Screen name="Ujlap" component={Ujlap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fooldal: {
    alignItems: 'left',
    justifyContent: 'center',
    padding: 'auto',
    backgroundColor: '#D1F2EB',
    marginTop: 1,
    marginBottom: 120,
    borderRadius: 10,
    marginLeft: 10,
  },
  notificationsscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  szoveg1: {
    fontSize: 40,
    fontFamily: 'HiraMinProN-W3',
    paddingBottom: 2,
  },
});