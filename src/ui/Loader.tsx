import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@utils/colors';
interface Props {
  color?: string;
}

const Loader: FC<Props> = ({ color = colors.PRIMARY }) => {
  const initialRotation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${initialRotation.value}deg` }],
    };
  });
  useEffect(() => {
    initialRotation.value = withRepeat(withTiming(360), -1);
  });

  return (
    <Animated.View style={transform}>
      <AntDesign name="loading1" color={color} size={24} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Loader;
