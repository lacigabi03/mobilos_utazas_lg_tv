import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, Alert, Image} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Nevezetessegek = ({navigation, route}) => {
  const {atkuld1,} = route.params
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNevezetessegek = async () => {
    try {
        var adatok ={
            "bevitel1":atkuld1
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
  }, []);
  
  


    
  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({Nevezetesseg_id}) => Nevezetesseg_id}
          renderItem={({item}) => (
            <View style=
            {
                {
                    flex: 1,
                    alignItems: 'center'
                }
            }>
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
              {item.Orszag_id}, 
              {item.Nevezetesseg_nev}, 
              {item.Nevezetesseg_szoveg}
            </Text>

            <Image 
                source=
                {
                    {
                        uri:Ipcim.Ipcim+item.Nevezetesseg_kep
                    }
                }

                style=
                {
                    {
                        width:224,
                        height:160, 
                        backgroundColor: 'white', 
                        marginLeft: 'auto', 
                        marginRight: 'auto'
                    }
                }   
            />

<WebView
                source=
                {
                    { 
                        uri:item.Nevezetesseg_video
                    }
                } 
                style=
                {
                    { 
                        width: 400,
                        height: 100

                    }
                } 
            />

            </View>
            
          )}
        />
      )}
    </View>
  );
};

export default Nevezetessegek;