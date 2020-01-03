import React, { useState, useEffect } from 'react';
import {
  Text, View, Keyboard, TouchableHighlight, Image
} from 'react-native';
import {
  Button, TextInput, Avatar, Subheading, TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/EvilIcons';

import ImagePicker from 'react-native-image-picker';

const ImageInput = ({ source, onChangeImage }) => {

  const [img, setImg] = useState(null);

  useEffect(() => {
    if (source != null && source !== undefined && source != "") {
      setImg({ uri: source });
    }
  }, [])
  

  const _showImagePicker = () => {

    const options = {
      title: 'Choisir une image',
      cancelButtonTitle: 'Annuler',
      takePhotoButtonTitle: 'Depuis la caméra',
      chooseFromLibraryButtonTitle: 'Depuis la bibliothèque',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('null');
      } else if (response.error) {
        console.log('null');
      } else if (response.customButton) {
        console.log('null');
      } else {
        const source = { uri: response.uri };

        setImg({source});
        onChangeImage(response.uri);
      }
    });
  };

  const emptyState = () => {
    return (
      <View style={{
        alignItems: 'center', width: '100%', height: 200, backgroundColor: '#BBB'
      }}
      >
        <Icon name="image" size={150} color={'#FFF'} />
        <Subheading style={{ color: '#FFF', fontSize: 18 }}>Pour ajouter une image cliquer ici.</Subheading>
      </View>
    );
  };

  return (
    <TouchableRipple
      onPress={_showImagePicker}
    >
      <View>
        <Subheading style={{ color: '#AAA', fontSize: 13 }}>AJOUTER UNE IMAGE</Subheading>
        { img == null && emptyState() }
        { img && <Image source={img} style={{ width: '100%', height: 150 }} resizeMode="cover" />}
      </View>
    </TouchableRipple>
  );
};
export default ImageInput;
