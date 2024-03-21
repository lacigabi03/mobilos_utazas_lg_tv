import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, FlatList, Text, View, Button, Image, StyleSheet} from 'react-native';
import Ipcim from './Ipcim';


const KozosScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+"orszag");
      const json = await response.json();
      setData(json);
      //alert(JSON.stringify(json))
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
              {() => navigation.navigate('Orszagok', 
                {
                     /*1*/ atkuldOid:item.Orszag_id,
                      /*2*/ atkuldOnev:item.Orszag_nev,
                      /*3*/ atkuldOszoveg:item.Orszag_szoveg,
                      /*4*/ atkuldOzaszlo:item.Orszag_zaszlo,
                      /*5*/ atkuldOlink:item.Orszag_link,
                      /*6*/ atkuldOkonzuli:item.Orszag_konzuli,
                      /*7*/ atkuldOvaluta:item.Orszag_valuta,
                      /*8*/ atkuldOidozona:item.Orszag_idozona,
                      /*9*/ atkuldOvizum:item.Orszag_vizum

                })
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