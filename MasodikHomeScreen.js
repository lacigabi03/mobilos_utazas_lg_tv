import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, Button, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { TouchableOpacity } from 'react-native'

//--------   Hivatkozások   --------\\

import Varos from './Varos'
import Felvitel from './Felvitel'
import Lenyilo from './Lenyilo'
import KozosScreen from './KozosScreen'
import Video from './Video'
import Nevjegy from './Nevjegy'
import KeresesSzoveg from './KeresesSzoveg'
import Ipcim from './Ipcim';
import Nevezetessegek from './Nevezetessegek';
import Orszagok from './Orszagok';
import { Picker } from '@react-native-picker/picker';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MasodikHomeScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {atkuld1,} = route.params
  

  useEffect(() => {
    const getOrszag = async () => {
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
    getOrszag();


  }, [])
  const getNevezetessegek = async () => {
    try {
        var adatok ={
            "bevitel1":atkuld1
        }
    
    const response = await fetch(Ipcim.Ipcim+"Nevezetessegek", 
    {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    )
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNevezetessegek();
  }, []);

 

  return (          //orszagok_322_fda
    <View style={{ backgroundColor: '#c5fffc'}}>
      <SafeAreaView>
      <ScrollView>
  <View>
    <ImageBackground
      source={require('./orszagok_322_fda.jpg')}>
      <Text 
        style={{
          fontSize: 40,
          marginLeft: 20,
          marginRight: 260,
          marginBottom: 10,
          marginTop: 19,
          backgroundColor: 'grey',
          opacity: 0.9
        }}>
        Országok
      </Text>
    </ImageBackground>
  </View>

  {/* Országok */}
  <ScrollView 
    horizontal={true} 
    showsHorizontalScrollIndicator={false}>
    {data.map((item) => (
      <View 
        key={item.Orszag_id}
        style={{
          flex: 2, 
          paddingLeft: 10, 
          paddingRight: 45, 
          backgroundColor: '#319ee0', 
          paddingTop: 20, 
          paddingBottom: 20
        }}>
        <View>       
          <Text 
            style={{
              fontWeight:'bold', 
              color: 'blue', 
              fontSize: 25, 
              textAlign: 'center'
            }}>
            {item.Orszag_nev}
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Orszagok', {
              atkuld1:item.Orszag_id,
              atkuld2:item.Orszag_nev,
              atkuld3:item.Orszag_szoveg,
              atkuld4:item.Orszag_zaszlo,
              atkuld5:item.Orszag_link
            })} 
          > 
            <Image
              source={{uri:Ipcim.Ipcim+item.Orszag_zaszlo}} 
              style={{
                width:224,
                height:160, 
                backgroundColor: 'white', 
                marginLeft: 'auto', 
                marginRight: 'auto'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
  <View>
    <ImageBackground
      source={require('./nevezetes_411.jpg')}>
        <View
        style=
        {
          { 
            backgroundColor: '#f4ffc5',
            marginLeft: 20,
            marginRight: 245,
            marginBottom: 20,
            marginTop: 20,
            overflow:'hidden',
            borderRadius:10,  
            alignItems: 'center',  
            
          }
        }>
      <Text 
        style={{
          fontSize: 25,
          backgroundColor: '#f4ffc5',
          opacity: 0.8,
          borderRadius:10,
        
        }}>
        Nevezetességek
      </Text>
      </View>
    </ImageBackground>
  </View>
  
  {/* Nevezetességek */}
  <ScrollView 
    horizontal={true} 
    showsHorizontalScrollIndicator={false}>
    <TouchableOpacity
      onPress={() => navigation.navigate('Nevezetessegek', {
        
      })}>
{/*
        atkuld1:data[0].Orszag_id,
        atkuld5:item.Nevezetesseg_nev,
        atkuld6:item.Nevezetesseg_szoveg,
        atkuld7:item.Nevezeteseeg_kep,
        atkuld8:item.Nevezetesseg_video
        */} 
      </TouchableOpacity>
  </ScrollView>
</ScrollView>
      </SafeAreaView>
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

function Orszagok_megjelenites({ navigation }) {
  return <Orszagok />;
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
      <Drawer.Screen name="Orszagok" component={Orszagok} />
      <Drawer.Screen name="Felvitel" component={Felvitel} />
      <Drawer.Screen name="Lenyilo" component={Lenyilo} />
      <Drawer.Screen name="KözösScreen" component={KozosScreen} />
      <Drawer.Screen name="Videó" component={Video} />
      <Drawer.Screen name="Névjegy" component={Nevjegy} />
      <Drawer.Screen name="KeresésSzöveg" component={KeresesSzoveg} />
      <Drawer.Screen name="Nevezetessegek" component={Nevezetessegek} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Vissza" component={Root} options={{ headerShown: false }} />
        <Stack.Screen name="Orszagok" component={Orszagok} />
        <Stack.Screen name="Nevezetessegek" component={Nevezetessegek} />

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
