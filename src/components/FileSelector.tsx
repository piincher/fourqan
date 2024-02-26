import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
interface Props {
  icon?: React.ReactNode;
  btnTitle: string;
  style?: StyleProp<ViewStyle>;
}
export const FileSelector = ({ icon, btnTitle, style }: Props) => (
  <Pressable style={[style, styles.btnContainer]}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.btnTitle}>{btnTitle}</Text>
  </Pressable>
);
const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    marginTop: 10,
  },
});
