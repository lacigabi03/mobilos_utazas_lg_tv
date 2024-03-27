import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, Button, StyleSheet, ScrollView, FlatList, Image, DefaultTheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { TouchableOpacity } from 'react-native'

//--------   Hivatkozások   --------\\


import Felvitel from './Felvitel';
import KozosScreen from './KozosScreen';
import Nevjegy from './Nevjegy';
import KeresesSzoveg from './KeresesSzoveg';
import Ipcim from './Ipcim';
import Nevezetessegek from './Nevezetessegek';
import Orszagok from './Orszagok';
import KeresesNevezetessegek from './KeresNevezetessegek';


//Viktor
import Varoskeres from "./Varoskeres";
import Varosrepjegykeres from "./Varosrepjegykeres";
import Video from "./Video";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    backgroundColor: '#A8B0FF',
    primary: '#A8B0FF',
    card: '#A8B0FF',
    text: '#3E6F56',
    border: '#8C8C88'
  }
}

function MasodikHomeScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const atkuldOid = route.params ? route.params.atkuldOid : null;

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
            "bevitel1": atkuldOid
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
    
  }, [atkuldOid]);

  return (
    <View style={{ backgroundColor: '#c5fffc', }}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.row}>
            
              <Text 
                style={{
                  fontSize: 40,
                  marginLeft: 20,
                  //marginRight: 260,
                  marginBottom: 2,
                  marginTop: 29,
                  //backgroundColor: 'grey',
                  opacity: 0.9,
                  alignItems:'center',
                }}>
                Országok
              </Text>
                
              <Image 
                source={require('./kepek/orszagok6260.png')} 
                style=
                    {
                      {
                            width:100,
                            height:100, 
                            backgroundColor: '#c5fffc', 
                            marginLeft: 20, 
                            marginRight: 'auto',
                            marginBottom: 20
                      }
                    }
            />
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
                  paddingLeft: 25, 
                  paddingRight: 23, 
                  backgroundColor: '#B3E0D7', 
                  paddingTop: 20, 
                  paddingBottom: 20,
                  borderRadius:10,
                  marginLeft:20,
                  marginBottom:10,
                  
                }}>
                <View>       
                  <Text 
                    style={{
                      fontWeight:'bold', 
                      color: '#20B500', 
                      fontSize: 25, 
                      alignItems: 'center'
                    }}>
                    {item.Orszag_nev}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('Orszagok', {
                      atkuldOid:item.Orszag_id,
                      atkuldOnev:item.Orszag_nev,
                      atkuldOszoveg:item.Orszag_szoveg,
                      atkuldOzaszlo:item.Orszag_zaszlo,
                      atkuldOlink:item.Orszag_link,
                      atkuldOkonzuli:item.Orszag_konzuli,
                      atkuldOvaluta:item.Orszag_valuta,
                      atkuldOidozona:item.Orszag_idozona,
                      atkuldOvizum:item.Orszag_vizum
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
              source={require('./kepek/nevezetes_411.jpg')}>
                <View style={styles.row}>
            
            <Text 
              style={{
                fontSize: 40,
                marginLeft: 20,
                //marginRight: 260,
                marginBottom: 2,
                marginTop: 29,
                //backgroundColor: 'grey',
                opacity: 0.9,
                alignItems:'center',
              }}>
              Nevezetességek
            </Text>
              
            <Image 
              source={require('./kepek/nevezetessegek234234.png')} 
              style=
                  {
                    {
                          width:100,
                          height:100, 
                          //backgroundColor: '#c5fffc', 
                          marginLeft: 20, 
                          marginRight: 'auto',
                          marginBottom: 20
                    }
                  }
          />
        </View>
            </ImageBackground>
          </View>
          
          {/* Nevezetességek */}
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
                <TouchableOpacity
              onPress={() => navigation.navigate('Nevezetessegek', {
                atkuldOid:item.Orszag_id,
                atkuldOnev:item.Orszag_nev,
                atkuldNnev:item.Nevezetesseg_nev,
                atkuldNszoveg:item.Nevezetesseg_szoveg,
                atkuldNkep:item.Nevezetesseg_kep,
                atkuldNvideo:item.Nevezetesseg_video,
                atkuldNterkep:item.Nevezetesseg_terkep
              })}> 
              <Text 
                    style={{
                      fontWeight:'bold', 
                      color: 'blue', 
                      fontSize: 25, 
                      alignItems: 'center'
                    }}>
                    {item.Orszag_nev}
                  </Text>
            </TouchableOpacity>       
                  
            </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
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
          backgroundColor: '#559EFF',
          color: 'red',
        },
        headerShown: true,
      }}
      initialRouteName="Főoldal"> 
      <Drawer.Screen name="Főoldal" component={MasodikHomeScreen} />
      <Drawer.Screen name="Felvitel" component={Felvitel} />
      <Drawer.Screen name="Országok" component={KozosScreen} />
      <Drawer.Screen name="Ország keresés" component={KeresesSzoveg} />
      <Drawer.Screen name="Nevezetessegek" component={Nevezetessegek} />
      <Drawer.Screen name="KeresNevezetessegek" component={KeresesNevezetessegek}/>
      <Drawer.Screen name="Névjegy" component={Nevjegy} />


      <Drawer.Screen name="Város keresése" component={Varoskeres} />  
      <Drawer.Screen name="Repülőjegy város" component={Varosrepjegykeres} />    
      <Drawer.Screen name="Súgó" component={Video} />
      
      
    </Drawer.Navigator>
  );
}

export default function App() {   
  return (
    <NavigationContainer independent={true} theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Vissza" component={Root} options={{ headerShown: false }} />
        <Stack.Screen name="Orszagok" component={Orszagok} options={{ headerShown: true }} />
        <Stack.Screen name="Nevezetessegek" component={Nevezetessegek} options={{ headerShown: true }}/>
        <Stack.Screen name="KeresesNevezetessegek" component={KeresesNevezetessegek} />


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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems:'center',
  },  
});
