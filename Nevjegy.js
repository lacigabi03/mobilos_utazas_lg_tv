import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

const Nevjegy = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.10.64:3000/nevjegy');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24, backgroundColor: '#AA23'}}>

<WebView source={{ uri: 'https://www.youtube.com/?hl=hu&gl=HU' }} style={{ flex: 1 }} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text style = 
            {
              {
                color: "brown",
                fontSize: 35,
                textAlign: "center",
                marginTop: 20,
                marginBottom: 5
              }
            }>

            
                Készítette:
              {item.Nevjegy_nev}, 
              Ideje:
              {item.Nevjegy_datum}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Nevjegy;