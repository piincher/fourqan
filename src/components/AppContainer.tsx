import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

const longText =
  "Bonjour une nouvelle version de l'application est disponible. Veuillez la télécharger pour continuer à utiliser l'application.Dans quelques jours, l'ancienne version ne sera plus disponible. Merci pour votre compréhension. Bonne journée. si vous avez fait la mise à jour, veuillez ignorer ce message. Merci.";

const AppContainer: FC<Props> = ({ children }) => {
  const animatedX = useSharedValue(0);
  const isPaused = useSharedValue(false);
  const handlePress = () => {
    isPaused.value = !isPaused.value;

    console.log('isPaused', isPaused.value);
  };

  const movingText = () => {
    if (!isPaused.value) {
      animatedX.value = withRepeat(
        withTiming(100, { duration: 1000, easing: Easing.ease }),
        -1,
        true,
      );
    }
  };

  useEffect(() => {
    movingText();
  }, [isPaused]);

  console.log('animatedX');

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedX.value }],
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View style={[styles.marqueeContainer, animationStyle]}>
          <Text style={{ color: 'red' }}>{longText}</Text>
        </Animated.View>
      </Pressable>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marqueeContainer: {
    flexDirection: 'row',
    // You can add padding or other styles as needed
  },
});

export default AppContainer;
