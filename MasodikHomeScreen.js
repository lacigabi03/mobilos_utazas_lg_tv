import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, Button, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
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

function MasodikHomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedNevezetessegek, setSelectedNevezetessegek] = useState();

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
  

    getNevezetessegek();

  }, []);

  return (
    <View style={{ backgroundColor: '#c5fffc'}}>
      <SafeAreaView />
      <ScrollView>
      <Text 
        style={{
          fontSize: 40,
          paddingTop: 30,
          paddingBottom: 10,
          marginLeft: 20
        }}>
        Országok
      </Text>

        {/*  Országok */}
        <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={data}
          keyExtractor={({Orszag_id}) => Orszag_id}
          horizontal
          renderItem={({item}) => (
            <View 
              style={{
                flex: 2, 
                paddingLeft: 10, 
                paddingRight: 45, 
                backgroundColor: '#ABEBC6', 
                paddingTop: 20, 
                paddingBottom: 20
              }}>
              <View>       
                <Text style={{fontWeight:'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>
                  {item.Orszag_nev}
                </Text>
                <TouchableOpacity 
                onPress=
                {
                  () => navigation.navigate('Orszagok',
                  {
                    atkuld1:item.Orszag_id,
                    atkuld2:item.Orszag_nev,
                    atkuld3:item.Orszag_szoveg,
                    atkuld4:item.Orszag_zaszlo,
                    atkuld5:item.Orszag_link
                  })
                } 
                
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
          )}
        />
      </ScrollView>
      <Text 
        style={{
          fontSize: 40,
          paddingTop: 30,
          paddingBottom: 10,
          marginLeft: 20
        }}>
        Nevezetességek
      </Text>
      {/*Nevezetességek*/}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={data}
          keyExtractor={({Nevezetesseg_id}) => Nevezetesseg_id}
          horizontal
          renderItem={({item}) => (
            <View 
              style={{
                flex: 2, 
                paddingLeft: 10, 
                paddingRight: 45, 
                backgroundColor: '#ABEBC6', 
                paddingTop: 20, 
                paddingBottom: 20
              }}>
              <View style=
            {
                {
                    flex: 1,
                    alignItems: 'center'
                }
            }>       
                <Text style={{fontWeight:'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>
                  {item.Orszag_id}
                </Text>
                
              </View>
            </View>
          )}
        />
      </ScrollView>


      <Text 
        style={{
          fontSize: 40,
          paddingTop: 30,
          paddingBottom: 10,
          marginLeft: 20
        }}>
        Érdekességek
      </Text>

      {/*Érekességek*/}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={data}
          keyExtractor={({Orszag_id}) => Orszag_id}
          horizontal
          renderItem={({item}) => (
            <View 
              style={{
                flex: 2, 
                paddingLeft: 10, 
                paddingRight: 45, 
                backgroundColor: '#ABEBC6', 
                paddingTop: 20, 
                paddingBottom: 20
              }}>
              <View>       
                <Text style={{fontWeight:'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>
                  {item.Orszag_nev}
                </Text>
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
              </View>
            </View>
          )}
        />
      </ScrollView>



      <Text 
        style={{
          fontSize: 40,
          paddingTop: 30,
          paddingBottom: 10,
          marginLeft: 20
        }}>
        Városok
      </Text>
      {/*  VÁROSOK*/}
      <View>
      <Picker
      style={{backgroundColor: '#EEDC81', position:'absolute', bottom: 0, left: 0, right: 0, }}
      selectedValue={selectedNevezetessegek}
      onValueChange={(itemValue, itemIndex) =>
          setSelectedNevezetessegek(itemValue)
                    }>
    {data.map((item)=>{
        return(
            <Picker.Item label={item.Nevezetesseg_nev} />

         
	)}
	)}
  
</Picker>
      </View>
        






      </ScrollView>
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
