import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Button} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const Orszagok = ({navigation, route}) => {
    const {atkuld1,atkuld2,atkuld3,atkuld4,atkuld5,atkuld6,atkuld7,atkuld8,atkuld9 } = route.params

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
    const kattolás=() =>{
        alert(Orszag_nev)
    }

    useEffect(() => {
        getOrszag();
    }, []);

    
    return (
        
        <SafeAreaView 
            style=
            {
                {
                    flex: 1,
                    alignItems: 'center'
                }
            }
        >
            
            <ScrollView 
                    style={styles.scrollView}
            >
            <View style={styles.row}>
                
            <View>
                <Text 
                    style=
                    {
                        {
                            textAlign: 'center',
                            fontSize: 100,
                            fontFamily: 'Savoye LET',
                            paddingTop: 20
                        }
                    }
                >
                {atkuld2}
                </Text>
            </View>

            <View>
                <Image 
                    source=
                    {
                        {
                            uri:Ipcim.Ipcim+atkuld4
                        }
                    }

                    style=
                    {
                        {
                            width:112,
                            height:80, 
                            backgroundColor: 'white', 
                            marginLeft: 'auto', 
                            marginRight: 'auto'
                        }
                    }   
                />
            </View>

            </View>
            
            <TouchableOpacity onPress={() => Linking.openURL(atkuld9)}>
            <Image 
            source={require('./info1234.png')} 
            style=
                    {
                        {
                            width:90,
                            height:90, 
                            backgroundColor: 'white', 
                            marginLeft: 20, 
                            marginRight: 'auto'
                        }
                    }
            />
            
            </TouchableOpacity>
            

        


                <Text
                    style=
                    {
                        styles.valamiszoveg 
                    }
                >
                {atkuld3}
                </Text>
                <View style={{backgroundColor: 'green', paddingBottom:20}}>
                <Text>
                    Fontos információk az országról
                </Text>
                
                <TouchableOpacity
                    onPress={() => kattolás()}
                    title="Mehet"
                    color="red"
                    
                
                />
                </View>

            <View
                style=
                {
                  { 
                    color:'#800000',
                    paddingTop: 5,
                    marginTop: 10,
                    marginBottom: 45,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize:20,
                    height:45,
                    overflow:'hidden',
                    borderRadius:10,
                    backgroundColor:'#0C37DA',
                    borderRadius:20
                        
                  }
                }
            >
            <Button 
                onPress=
                    {() => navigation.navigate('Nevezetessegek',
                        {
                            atkuld1:atkuld1,
                            atkuld5:atkuld5,
                            atkuld6:atkuld6,
                            atkuld7:atkuld7,
                            atkuld8:atkuld8
                        }
                    )}
                title="Részletek"
                color="red"
                fontSize='20'
                height='45'
                overflow='hidden'
                paddingTop='10'
                paddingBottom='20'                        
            />


            </View>
            
            <WebView
                source=
                {
                    
                    { 
                        uri:atkuld5
                    }
                
                } 
                style=
                {
                    { 
                        width: 400,
                        height: 300,
                        marginTop: 10, 
                        marginBottom: 200,
                        marginLeft: 10

                    }
                } 
            />
                
        
            </ScrollView>
        </SafeAreaView>
        
    );
};


//                                                                                                    S     T     Y     L    E
//                                                 S     T     Y     L    E
//        S     T     Y     L    E

const styles =StyleSheet.create({
    container: {
        alginItems: 'center',
        justifyContent: 'center',
        paddingTop: 20, 
        backgroundColor: '#D1F2EB'
        
    },
    valamiszoveg: {
        fontSize: 30,
        fontFamily: 'Avenir Next Condensed',
        paddingTop: 35,
        marginLeft: 10,
        marginRight: 10
    },
    scrollView : {
        backgroundColor: '#D1F2EB',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 10
      },
});

export default Orszagok;
