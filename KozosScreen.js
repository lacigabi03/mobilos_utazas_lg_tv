import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, FlatList, Text, View, Button, Image, StyleSheet} from 'react-native';
import Ipcim from './Ipcim';

const KozosScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+"Orszag");
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
    <View 
      styles=
      {
        {
          backgroundColor: 'white'
        }
      }
    >
      <Text 
        style=
          {styles.focim}
      >
        Országok
      </Text>
    <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        
        <FlatList
          data={data}
          keyExtractor={({Orszag_id}) => Orszag_id
        }
          horizontal
          renderItem={({item}) => (
            
            <View 
              style=
              {
                {
                  flex: 2, 
                  paddingLeft: 10, 
                  paddingRight: 45, 
                  backgroundColor: '#ABEBC6', 
                  paddingTop: 200, 
                  paddingBottom: 390
                }
              }
            >
<View>
            <Text style={{fontWeight:'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>
               {item.Orszag_nev}
            </Text>

            <Image 
              source={{uri:Ipcim.Ipcim+item.Orszag_zaszlo}} 
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
</View>            

                            {/* Gomb átugrik az " Ujlap.js "-re */}
              <View 
                style=
                {
                  { 
                    color:'#800000',
                    paddingTop: 5,
                    marginTop: 10,
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
              {() => navigation.navigate('Ujlap', 
                {
                  atkuld1:item.Orszag_id, 
                  atkuld2:item.Orszag_nev, 
                  atkuld3:item.Orszag_szoveg, 
                  atkuld4:item.Orszag_zaszlo,
                  atkuld5:item.Orszag_link
                }
                        )
              }
                title="Részletek"
                color="#F8F8F8"
                fontSize='20'
                height='45'
                overflow='hidden'
                paddingTop='10'                        
              />
                        
              </View>
                               
            </View>
            
          )}
        />
      )}
       
      
    </ScrollView>
    
    </View>
  );
};
const styles =StyleSheet.create({
  focim: {
      alginItems: 'center',
      justifyContent: 'center',
      padding: 'auto', 
      backgroundColor: '#D1F2EB',
      fontSize: 45,
      textAlign: 'center',
      color: '#F39C12',
      
      
      
      
  }
});

{/*

height: 170, width: 230, marginLeft: 20, borderWidth: 10, borderColor: '#dddddd'*/}

export default KozosScreen;