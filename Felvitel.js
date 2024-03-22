import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, Platform, ImageBackground,StyleSheet, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ipcim from './Ipcim';
import { Picker } from '@react-native-picker/picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');

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

  const kattintas=()=>{
    alert(selectedOrszag)
  }

  useEffect(() => {
    getOrszag();
  }, []);

  const SERVER_URL = Ipcim.Ipcim;
/*
  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
*/

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  if (photo.cancelled || photo.canceled) {
    // Handle case where photo selection was cancelled
    console.warn('Photo selection was cancelled.');
    return null; // or handle it according to your application's logic
  }

  if (photo.assets && photo.assets.length > 0) {
    // Use 'assets' array if available
    const asset = photo.assets[0];
    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: asset.uri,
    });
  } else {
    // Fallback to 'uri' for compatibility
    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
  const handleUploadPhoto = async () => {
    try {
      if (!image) {
        console.log('Please select an image first');
        return;
      }

      const response = await fetch(`${SERVER_URL}api/upload`, {
        method: 'POST',
        body: createFormData(image, { bevitel1 }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      console.log('response', data);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <ImageBackground source={require('./kepek/felvielhatter.jpg')} style={{width: '100%', height: '100%'}}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{paddingBottom: 20, }}>
    <View 
    style=
    {
      {
        backgroundColor: "#fffea2",
        borderRadius:10,
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop:20,
        paddingBottom:20,
        opacity: 0.7
      }
    }>
    <Text style=
    {
      {
        padding: 10, 
        color:"red",
        textAlign: 'center',
        fontSize: 20
      }
    }>
      Add meg a nevezetesség kép nevét:
    </Text>

    <TextInput
        style=
        {
          {
          height: 60, 
          margin:5, 
          backgroundColor:"red",
          paddingLeft: 5,
          paddingRight: 5
          }      
        }
        placeholder="Írd be a nevet!"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
    />
    
    </View>
    <View style={{backgroundColor:"#fffea2", borderRadius: 10, opacity: 0.7}}>
    <Text style=
    {
      {
        padding: 10, 
        color:"red",
        textAlign: 'center',
        fontSize: 20
      }
    }>
      Valaszd ki az országot:
    </Text>
    <Picker
        
      selectedValue={selectedOrszag}
      onValueChange={(itemValue, itemIndex) =>
      setSelectedOrszag(itemValue)
      }
    >
  {data.map((item)=>{
      return(
          <Picker.Item label={item.Orszag_nev} value={item.Orszag_id} key={item.Orszag_id}/>
      )}
  )}
</Picker>

</View>
<View style={{paddingBottom:20, paddingTop:1}}>
    <View style=
    {
      {
        backgroundColor: "#6fff75",
        borderRadius: 10
      }
    }>
    
    <Button title="Válaszd ki a képet a gallériádból" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </View>
    </View>
    </View>

    {/* Kép feltöltés BUTTON */}
    
    <View style={{paddingBottom:20, paddingTop:20,}}>
    <View style=
    {
      {
        backgroundColor: "#fe9023",
        borderRadius: 10,
        
         
      }
    }>
    <Button title="Kép feltöltése" onPress={handleUploadPhoto} />
    </View>
    </View>  
  

    
      
    
    
    </View>
     
      
      
      
    
    </ImageBackground>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'red'
  },
});