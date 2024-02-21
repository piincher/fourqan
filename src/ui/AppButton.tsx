import { colors } from '@utils/colors';
import React, { FC } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress: () => void;
  busy?: boolean;
}

const AppButton: FC<Props> = ({ title, onPress, busy }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {busy ? <Loader /> : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
});

export default AppButton;
