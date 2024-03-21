import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, ImageBackground, Image} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Nevezetessegek = ({navigation, route}) => {
  const {atkuldOid,} = route.params
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNevezetessegek = async () => {
    try {
        var adatok ={
            "bevitel1":atkuldOid
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
    <ImageBackground source={require('./hatter1234.png')} style={{width: '100%', height: '100%'}}>
    <View style={{flex: 1, padding: 24, }}>
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
                    alignItems: 'center',
                    
                }
            }>
            <Text style = 
            {
              {
                color: "brown",
                fontSize: 35,
                textAlign: "center",
                marginTop: 10,
                marginBottom: 5,
                backgroundColor: 'pink'
              }
            }>
               
              |- {item.Nevezetesseg_nev} -|
              
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
                        width:300,
                        height:200, 
                        marginLeft: 'auto', 
                        marginRight: 'auto',
                        resizeMode: 'center'
                    }
                }   
            />

            <Text style = 
            {
              {
                color: "brown",
                fontSize: 35,
                textAlign: "center",
                marginTop: 20,
                marginBottom: 5,
                backgroundColor: '#DAF7A6'
              }
            }>
               
               
              {item.Nevezetesseg_szoveg}
            </Text>

            

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
                      width: 300,
                      height: 200,
                      marginTop: 10, 
                      marginBottom: 80,
                      marginLeft: 10

                    }
                } 
            />

            </View>
            
          )}
        />
      )}
    </View>
    </ImageBackground>
  );
};

export default Nevezetessegek;