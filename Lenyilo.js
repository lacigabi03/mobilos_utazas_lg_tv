import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedOrszag, setSelectedOrszag] = useState();

  const getOrszag = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'orszag');
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
    getOrszag();
  }, []);

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: '#AA23'}}>

<Picker
  selectedValue={selectedOrszag}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedOrszag(itemValue)
  }>
    {data.map((item)=>{
        return(
            <Picker.Item label={item.Orszag_nev} value={item.Orszag_id} />
         
	)}
	)}
  
</Picker>

<Button
      onPress={() => kattintas()}
      title="Teszt"
      color="#C41E3A"
      />
  
</View>
  );
};

export default App;