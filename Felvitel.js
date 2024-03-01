import React, { useState } from 'react';
import { Button, Image, View, Text, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ipcim from './Ipcim';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text style={{padding: 10}}>
      Név:
      </Text>
      
      <TextInput
        style={{height: 40, margin:5, backgroundColor:"cyan"}}
        placeholder="Írd be a nevet!"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
    />
     
      <Button title="Kép feltöltése" onPress={handleUploadPhoto} />
      <Button title="Válaszd ki a képet a gallériádból" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      
    </View>
  );
}