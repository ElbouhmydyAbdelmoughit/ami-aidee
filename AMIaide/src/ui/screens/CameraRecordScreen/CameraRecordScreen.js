import React from 'react';
import { SafeAreaView } from 'react-native';
import CameraRecord from 'src/ui/components/CameraRecord';
//import { pushPreviewScreen } from 'src/ui/navigation';
import styles from './styles';

// PREVIEW_SCREEN
const CameraRecordScreen = ({ values }) => {

  const handlePreviewAction = () => {
    pushPreviewScreen(values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CameraRecord
        style={styles.container}
        form={values}
        source={values.videoUri}
        onValidate={(uri) => {
          handlePreviewAction({
            form: values,
            videoUri: uri
          });
        }}
      />
    </SafeAreaView>
  );
}
export default CameraRecordScreen;
