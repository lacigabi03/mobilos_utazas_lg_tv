import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TextInput, Button, Pressable} from 'react-native';
import Ipcim from './Ipcim';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';




const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [varosokdata, setvarosokData] = useState([]);
  const [kivalasztott, kivalasztottData] = useState();
  
  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'erdekessegek');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const varosok = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'varosok');
      const json = await response.json();
      setvarosokData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    getMovies();
  };

  useEffect(() => {
    varosok()
  }, []);


  const keresfuggveny=async ()=>{
 
  var adatok={
    "bevitel1":kivalasztott
  }
  try {
    const response = await fetch(Ipcim.Ipcim+'keresvaros',
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
  }


  


  return (
 <ScrollView style={{backgroundColor:"lightgrey"}}>
    <View style={{flex: 1, padding: 24}}>
    <Text style={{textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, 
    shadowRadius: 3, 
    elevation: 5,
  }}>
              Válaszd ki az érdekelt várost!
              </Text>
          <Picker

            selectedValue={kivalasztott}
            
            
            onValueChange={(itemValue, itemIndex) =>
              kivalasztottData(itemValue)

            }>



            {varosokdata.map((item) => {
              return (

                <Picker.Item label={item.varos_neve} value={item.varos_id} color='black' />
                
              )
            }
            )}
          </Picker>
       

        <Pressable  
        onPress={()=>keresfuggveny()}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "white" : "lightblue",
          elevation: pressed ? 2 : 0,
          borderRadius: 10,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3,
          marginBottom:10

        })} >
<Text style={{ fontSize: 25, padding: 10, textAlign: 'center' }} >
  Keresés
</Text>
        </Pressable>
       
    {/* <TextInput
        style={{height: 40}}
        placeholder="Írd be a várost!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
    <Button
        title ='Keresés'
        onPress={()=>keresfuggveny()}
        /> */}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({erd_id}) => erd_id.toString()}
          renderItem={({item}) => (
            <View style={{justifyContent:'center', alignItems:'center',  }}>

            <View >

          

            <Text style={styles.text}>
              {item.erd_nev}
              </Text>
              
              
              <Text style={styles.textleiras}>
              {item.erd_szoveg}
              </Text>
              
            </View>

            {/* <Text style={{color:"blue",height: 50 ,backgroundColor:"white", fontSize: 30, textAlign:'center', marginBottom:10}}>
              {item.varos_neve}
            </Text> */}

            <Image source={{uri:Ipcim.Ipcim+item.varos_kep}}
            style={
              {
               marginTop:10,
                alignSelf:'center',
                width:224,
                height:160,
                backgroundColor:'white',
                marginBottom:40,
                borderRadius:10
               
              }
            }
            />


           
            

            </View>
          )}
        />
      )}
    </View>
    </ScrollView>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
  text: {
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    borderColor: '#000', // Szegély színe
    borderWidth: 2, // Szegély vastagsága
    borderRadius: 10, // Szegély lekerekítése
    shadowColor: '#000', // Árnyék színe
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, // Árnyék opacitása
    shadowRadius: 3, // Árnyék sugarának sugara
    elevation: 5, // Androidon az árnyék megjelenítése
  },
 
  textleiras: {
    textAlign:"center",
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    borderColor: '#000', // Szegély színe
    borderWidth: 2, // Szegély vastagsága
    borderRadius: 10, // Szegély lekerekítése
    shadowColor: '#000', // Árnyék színe
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, // Árnyék opacitása
    shadowRadius: 3, // Árnyék sugarának sugara
    elevation: 5, // Androidon az árnyék megjelenítése
  }
  

  
});



export default App;


