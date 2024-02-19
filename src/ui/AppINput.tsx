import { colors } from '@utils/colors';
import React, { FC } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View>
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={colors.CONSTRAT}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONSTRAT,
    padding: 10,
  },
});

export default AppInput;
