import React, { useState, useEffect } from 'react';
import {
  FlatList, View, Text, ActivityIndicator, Platform, Dimensions
} from 'react-native';
import {
  Avatar, Button, Card, Title, Paragraph, TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Foundation';
import { RNCamera } from 'react-native-camera';
import VideoPlayer from 'react-native-video-controls';
import moment from 'moment';
import momentFR from 'moment/locale/fr';
import styles from './styles';

const CameraRecord = ({
  style, form, source, onValidate
}) => {

  const [uri, setUri] = useState(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isStoping, setIsStoping] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [title, setTitle] = useState('Message');

  const state = {
    recordOptions: {
      maxDuration: 15,
      quality: 0.5,
      base64: true
    }
  };

  useEffect(() => {
    if (source != null && source !== undefined && source != "") {
      setImg({ uri: source });
    }
  }, [])

  const takeVideo = async function () {
    if (camera) {
      try {
        const promise = camera.recordAsync(state.recordOptions);

        if (promise) {
          setIsRecording({ isRecording: true });
          const result = await promise;
          setIsRecording({ isRecording: false });
          setIsStoping({ isStoping: false });
          setUri({ uri: result.uri });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };


  const setup = async function () {
    if (camera) {
      const promise = camera.recordAsync(state.recordOptions);
      const data = await promise;
      setIsSettingUp({
        isSettingUp: false,
        recordOptions: {
          maxDuration: 20
        }
      });
    }
  };

  const onCameraReady = () => {
    setCameraReady({ cameraReady: true });
  };

  const updateRecord = async () => {
    if (isRecording === true) {
      camera.stopRecording();
    } else {
      takeVideo();
    }
  };

  const retake = () => {
    setUri({ uri: null });
  };

  const validate = () => {
    onValidate(uri);
  };

  const renderPreviewAction = () => {
    return (
      <View style={{
        width: '100%',
        height: 64,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      >
        <Button onPress={() => retake()}>Recommencer</Button>
        <Button onPress={() => validate()} mode="contained">Valider</Button>
      </View>
    );
  };

  const renderRecordAction = () => {
    return (
      <View style={{
        width: '100%', height: 64, justifyContent: 'center', alignItems: 'center'
      }}
      >
        {isSettingUp ? <ActivityIndicator size="small" color="#00ff00" />
          : <div>
            <TouchableRipple
              onPress={() => { updateRecord(); }}
              rippleColor="rgba(0, 0, 0, 0)"
            >
              <Icon
                name={isRecording ? 'stop' : 'record'}
                size={isRecording ? 34 : 64}
                color="red"
              />
            </TouchableRipple>
          </div>
        }
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={(ref) => {
            const camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onCameraReady={() => onCameraReady()}
        />
      </View>);
  };

  const renderVideoPreview = () => {
    return (
      <VideoPlayer
        source={{ uri }}
        navigator={navigator}
        ref={(ref) => { player = ref }} // Store reference
        style={styles.preview}
      />);
  };

  const fr = moment().locale('fr', momentFR);
  const {
    name, activite, reccurence, location
  } = form;
  const day = fr.format('dddd, MMMM Do YYYY');
  const hour = fr.format('HH:mm');
  const text = `Bonjour ${name}, nous sommes le ${day} il est ${hour}.\n\n penser à ${activite}, ${reccurence} ${form.moment} ${form.momentDate}\n${location}`;
  return (
    <View style={style}>
      {uri == null && renderCamera()}
      {uri != null && renderVideoPreview()}
      <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{text}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {(uri == null && cameraReady === true) && renderRecordAction()}
          {uri != null && renderPreviewAction()}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default CameraRecord;
