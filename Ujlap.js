import React from 'react';
import {StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Button} from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Ujlap = ({navigation, route}) => {
    const {atkuld1,atkuld2,atkuld3,atkuld4,atkuld5,atkuld6,atkuld7} = route.params

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
                        height: 100

                    }
                } 
            />
            
            <ScrollView 
                    style={styles.scrollView}
            >
                    
            <Text 
            style=
            {
                {
                    textAlign: 'center',
                    fontSize: 100,
                    fontFamily: 'Savoye LET'
                }
            }
            >
                
                {atkuld2}
            </Text>

            
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
                        width:224,
                        height:160, 
                        backgroundColor: 'white', 
                        marginLeft: 'auto', 
                        marginRight: 'auto'
                    }
                }   
            />


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
                atkuld6:atkuld6,
                atkuld7:atkuld7
              }
                
                  
                  
                  
                
                        )
              }
                title="Részletek"
                color="red"
                fontSize='20'
                height='45'
                overflow='hidden'
                paddingTop='10'
                
                                        
              />
              </View>
            
            
                
        
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
    }
});

export default Ujlap;
