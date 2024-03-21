import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
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
    <View style={{flex: 1, padding: 24, backgroundColor: '#D1F2EB', alignItems: 'center', paddingTop: 200}}>
        <TouchableOpacity onPress={() => {
                 {
                    Alert.alert(
                      "A szakdolgozatot készítette: "  
                      + 
                      "\nLászló Gábor"
                      +
                      "\n\n\nProjekt témája: "
                      +
                      "Utazás"
                      +
                      "\n\nCíme: ' Világ körül '"
                      +
                      "\n\n\n\nRöviden a programról"
                      +
                      "\n..."
                    
                      );
                }
                
                }
            }
            >
            <Image 
            source={require('./nevjegy123.png')} 
            style=
                    {
                        {
                            width:200,
                            height:200, 
                            backgroundColor: '#D1F2EB', 
                            marginLeft: 20, 
                            marginRight: 'auto',
                        }
                    }
            />
            
            </TouchableOpacity>
            <Text style={{fontWeight:'bold', fontSize:'25'}}>Névjegy infórmációért katt a képre!</Text>
      

      
      
    </View>
  );
};

export default Nevjegy;