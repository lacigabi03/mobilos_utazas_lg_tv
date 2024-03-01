import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, Alert, Image, } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedOrszag, setSelectedOrszag] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.10.64:3000/orszag');  //Iskolai: 'http://192.168.10.64:3000/'
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kattintas=()=>{
    alert(selectedOrszag)
  }
  

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24, backgroundColor:'#EEDC82'}}>
      <Text style={{fontSize: 25, color: 'black', textAlign: 'center' }}>Válaszd ki az országot</Text>
      
      <Picker
      style={{backgroundColor: '#EEDC81', position:'absolute', bottom: 0, left: 0, right: 0, }}
      selectedValue={selectedOrszag}
      onValueChange={(itemValue, itemIndex) =>
          setSelectedOrszag(itemValue)
                    }>
    {data.map((item)=>{
        return(
            <Picker.Item label={item.Orszag_nev} value={item.Orszag_zaszlo}/>

         
	)}
	)}
  
</Picker>

<Button
      onPress={() => kattintas()}
      title=""
      color="#C41E3A"
      />
      <Image source={{uri:'http://192.168.10.64:3000/'+selectedOrszag}} style={{width:112,height:80, backgroundColor: 'white'}}   />

      
    </View>
  );
};

export default App;