import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TextInput, Button} from 'react-native';
import Ipcim from './Ipcim';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';


const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [varosokdata, setvarosokData] = useState([]);
  const [kivalasztott, kivalasztottData] = useState();
  

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'repulok');
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
  //alert(text)
  var adatok={
    "bevitel1":kivalasztott
  }
  try {
    const response = await fetch(Ipcim.Ipcim+'repulojegykereses',
    {
        
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    )
    
    const json = await response.json();
    setData(json); 
   // alert(JSON.stringify(json))
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  }


  return (
    <View style={{flex: 1, padding: 24, backgroundColor:"lightgrey"}}>
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
       
    {/* <TextInput
        style={{height: 40}}
        placeholder="Add meg a város nevét ahonnan indul a gép!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      /> */}
    <Button
        title ='Keresés'
        onPress={()=>keresfuggveny()}
        />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View>

            <Text style={{color:"white",height:30, margin:20, fontSize:30 ,backgroundColor:"black", textAlign:'center'}}>
              {item.repulo_nev}
            </Text>


            <Text style={{color:"red",fontSize:15,textAlign:'center' }}>
            {moment(item.repulo_indulas).format('YYYY-MM-DD HH:mm (Z)')}
            </Text>

            <Text style={{color:"red",fontSize:15,textAlign:'center' }}>
              honnan: {item.repulo_honnan}
            </Text>

            <Text style={{color:"red",fontSize:15,textAlign:'center' }}>
              hova: {item.repulo_hova}
            </Text>


            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;