import React from 'react';
import {StyleSheet, Text, ImageBackground, View, TouchableOpacity, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <ImageBackground  
      source={require('./HomeScreenHatter.jpg')}
      style=
      {
        {
          flex: 1, 
          alignItems: 'left', 
          justifyContent: 'center',
          
        }
      }
    >
      <View style={styles.HomeScreenView}>
        <Text style={styles.HomeSreen}>
          Világ körül
        </Text>
      
      <Image source={require('./travel.png')} style={styles.Travelpng}/>
      
        <TouchableOpacity
          style={styles.HomeScreenTouchableOpacity}
          onPress={() => navigation.navigate('MasodikHomeScreen')}
          >
            <Text style={styles.kezdesgomb}>Kezdés</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

//                                                                                                    S     T     Y     L    E
//                                                 S     T     Y     L    E
//        S     T     Y     L    E

const styles =StyleSheet.create({
    HomeScreenView :
  {
    textAlign: 'center'
  },
  HomeSreen :
  {
    textAlign: 'center',
    fontSize: 60,
    paddingLeft: 80,
    color: 'blue',
    fontFamily:'Palatino-Bold',
    
  


    //Szöveg árnyék
    textShadowColor: '#7DF0FE',
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 6
  },
  kezdesgomb:
  {
    marginLeft: 90,
    fontSize: 40,
    color:'#FDFE84',
    height:45,
    overflow:'hidden',
    borderRadius:10,
    backgroundColor:'#0C37DA',
    borderRadius:20,
    textAlign: 'center',
    marginTop: 2,
  },
  Travelpng:
  {
    height: 200,
    width:300,
    marginLeft: 70,
    
  }
});

export default HomeScreen;