import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.10.64:3000/varos');
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
    <View style={{flex: 1, padding: 24}}>
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
              {item.Varos_id}, {item.Varos_nev}
            </Text>
          )}
        />
      )}
    </View>
    
  );
};

export default App;
