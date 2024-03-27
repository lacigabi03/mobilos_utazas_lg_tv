import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';


const Súgó = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
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
    <View style={{flex: 1, padding: 24, height:270,backgroundColor:"lightgrey"}}>

    <WebView 
    source={{ uri: 'https://www.youtube.com/embed/m_nEvzsJnbE?si=r5Ut8Z1G1OMEXwdU' }} 
    style={{  marginBottom:10, }} />
    
    <WebView 
    source={{ uri: 'https://www.youtube.com/embed/p_0iA1vHpHk?si=Dz8ZiI8ev4OoB8IF' }} 
    style={{ marginBottom:10 }} />
    
    <WebView 
    source={{ uri: 'https://www.youtube.com/embed/I1-p9qTAjwM?si=XOuMV7Vsj6Uw53wi' }} 
    style={{ marginBottom:10 }} />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Súgó;