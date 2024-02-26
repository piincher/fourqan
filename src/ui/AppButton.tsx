import { colors } from '@utils/colors';
import React, { FC } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import Loader from './Loader';

interface Props {
  title: string;
  onPress: () => void;
  busy?: boolean;
  borderRadius?: number;
}

const AppButton: FC<Props> = ({ title, onPress, busy, borderRadius }) => {
  return (
    <Pressable
      style={[styles.container, { borderRadius: borderRadius || 25 }]}
      onPress={onPress}
    >
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
  },
  title: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
});

export default AppButton;
