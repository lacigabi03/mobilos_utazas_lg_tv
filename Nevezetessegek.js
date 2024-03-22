import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';

const Nevezetessegek = ({navigation, route}) => {
  
  const {atkuldOid, atkuldNnev, atkuldNszoveg, atkuldNkep, atkuldNvideo, atkuldNterkep } = route.params
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
    //alert(atkuldNvideo)
    //alert(atkuldNterkep)
    getNevezetessegek();
  }, []);
  
  


    
  return (
    //<ImageBackground source={require('./kepek/hatter1234.png')} style={{width: '100%', height: '100%'}}>
    <View style={{flex: 1, padding: 24, backgroundColor:'#FFC360'}}>
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
                    //alignItems: 'center',
                    
                    
                }
            }>
              <View style={{paddingBottom:30}}>
              <View style={{backgroundColor:'#FFE4B7', borderRadius:10,  /*alignItems: 'center',*/}}>
            <Text style = 
            {
              {
                color: "brown",
                fontSize: 50,
                fontFamily: 'Didot',
                textAlign: 'left',
                marginTop: 20,
                marginLeft:20,
                marginBottom: 5,
                borderRadius:10,
                marginRight:'auto',
                backgroundColor: '#FFBF53',
              }
            }>
               
              {item.Nevezetesseg_nev}
              
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
                        resizeMode: 'center',
                      
                        
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
                //backgroundColor: 'rgba(218, 247, 166, 0.6)',
                
              }
            }>
               
               
              {item.Nevezetesseg_szoveg}
            </Text>
            
            <View style={styles.row}>
            <TouchableOpacity onPress={() =>            
                Linking.openURL(item.Nevezetesseg_video)
            }
            >
            <Image 
            source={require('./kepek/video_nevezetes.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#FFE4B7', 
                            marginLeft: 20, 
                            marginRight: 'auto',
                            marginBottom: 2
                        }
                    }
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>            
                Linking.openURL(item.Nevezetesseg_terkep)
            }
            >
            <Image 
            source={require('./kepek/terkep_nevezetes.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#FFE4B7', 
                            marginLeft: 20, 
                            marginRight: 'auto',
                            marginBottom: 2
                        }
                    }
            />
            </TouchableOpacity>
            </View>
            

            <View style={styles.row2}>
              <View style={styles.row2video}>
                <Text>
                  Videó
                </Text>
              </View>

              <View style={styles.row2terkep}>
                <Text>
                  Térkép
                </Text>
              </View>
                
                               
            </View>

             {/*        
            <View style={{alignItems:'center'}}>
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
                      marginBottom: 20,
                      alignItems:'center'

                    }
                } 
            />
            </View>
            */}

            </View>
            </View>
            </View>
             
          )}
        />
      )}
    </View>
    //</ImageBackground>
  );
};



const styles =StyleSheet.create({
  row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingTop: 10,
    },  
    row2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      //backgroundColor:"#FFBF53",
      marginBottom:10,
         
    },
    row2video: {
      backgroundColor:"#FFBF53",
      paddingLeft:10,
      paddingRight: 10,
      marginLeft:10,
    },
    row2terkep: {
      backgroundColor:"#FFBF53",
      paddingLeft:10,
      paddingRight: 10,
    },
});

export default Nevezetessegek;