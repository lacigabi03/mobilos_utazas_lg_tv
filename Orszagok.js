import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Button, Alert} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const Orszagok = ({navigation, route}) => {
    const {atkuld1, atkuld2, atkuld3, atkuld4, atkuld5, atkuld6, atkuld7, atkuld8, atkuldkon, atkuldval, atkuldido, atkuldvizum } = route.params

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
    

    useEffect(() => {
        alert(atkuldkon)
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
            
            <View style={styles.row}>
            <TouchableOpacity onPress={() => {
                if (atkuldkon) {
                    Linking.openURL(atkuldkon);
                }
                else
                {
                    console.error("nem jó :( ");
                }
                }
            }
            >
            <Image 
            source={require('./info1234.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#D1F2EB', 
                            marginLeft: 20, 
                            marginRight: 'auto',
                            marginBottom: 2
                        }
                    }
            />
            
            </TouchableOpacity>
            

            <TouchableOpacity onPress={() => {
                if (atkuldval) {
                    alert(atkuldval);
                }
                else
                {
                    Alert.alert("nem jó :( ");
                }
                }
            }
            >
            <Image 
            source={require('./valuta1230.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#D1F2EB', 
                            marginLeft: 20, 
                            marginRight: 'auto'
                        }
                    }
            />
            
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (atkuldido) {
                    alert(atkuldido);
                }
                else
                {
                    Alert.alert("nem jó :( ");
                }
                }
            }
            >
            <Image 
            source={require('./idozona321.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#D1F2EB', 
                            marginLeft: 20, 
                            marginRight: 'auto'
                        }
                    }
            />
            
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (atkuldvizum) {
                    alert(atkuldvizum);
                }
                else
                {
                    Alert.alert("nem jó :( ");
                }
                }
            }
            >
            <Image 
            source={require('./vizum123.png')} 
            style=
                    {
                        {
                            width:70,
                            height:70, 
                            backgroundColor: '#D1F2EB', 
                            marginLeft: 20, 
                            marginRight: 'auto'
                        }
                    }
            />
            
            </TouchableOpacity>
            </View>






            <View style={styles.row2}>
                <Text>Információk</Text>
                <Text>Valuta</Text>
                <Text>Időzóna</Text>
                <Text>Vízum</Text>               
            </View>
        


                <Text
                    style=
                    {
                        styles.valamiszoveg
                       
                    }
                >
                {atkuld3}
                </Text>
                
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
                    backgroundColor:'#FFEB76',
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
        backgroundColor: '#D1F2EB',
        
    },
    valamiszoveg: {
        fontSize: 30,
        fontFamily: 'Avenir Next Condensed',
        paddingTop: 35,
        marginLeft: 10,
        marginRight: 10,
        
    },
    scrollView : {
        backgroundColor: '#D1F2EB',
        flex: 1
    },
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
        backgroundColor:"#9CC7FF",
       

      },
});

export default Orszagok;
