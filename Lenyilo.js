import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedSeged, setSelectedSeged] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'segedVaros');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kattintas=()=>{
    alert(selectedSeged)
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: '#AA23'}}>

<Picker
  selectedValue={selectedSeged}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedSeged(itemValue)
  }>
    {data.map((item)=>{
        return(
            <Picker.Item label={item.seged_nev} value={item.seged_id} />
         
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