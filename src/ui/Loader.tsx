import { AntDesign } from '@expo/vector-icons';
import { colors } from '@utils/colors';
import React, { FC, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
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

export default Loader;
