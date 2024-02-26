import CategorySelector from '@components/CategorySelector';
import { FileSelector } from '@components/FileSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '@ui/AppButton';
import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

const Upload = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          btnTitle="Choisir"
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color="black"
            />
          }
        />
        <FileSelector
          btnTitle="Choisir"
          icon={
            <MaterialCommunityIcons
              name="file-document-outline"
              size={35}
              color="black"
            />
          }
          style={{ marginLeft: 20 }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput placeholder="title" style={styles.input} />
        <TextInput
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
        />
        <CategorySelector visible title="Category" />
        <AppButton title="Upload" onPress={() => {}} borderRadius={1} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default Upload;
