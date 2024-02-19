import AppInput from '@ui/AppInput';
import { colors } from '@utils/colors';
import { useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import Animated, {
  withSequence,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
interface Props {
  placeholder?: string;
  label: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const AuthInputField: FC<Props> = (props) => {
  const inputTransformValue = useSharedValue(0);
  const {
    onRightIconPress,
    rightIcon,
    placeholder,
    label,
    keyboardType,
    secureTextEntry,
    containerStyle,
    name,
  } = props;
  const { handleChange, values, errors, touched, handleBlur } =
    useFormikContext<{ [key: string]: string }>();
  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, { duration: 100 }),
      withSpring(0, {
        damping: 8,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  };
  const errorMsg = touched[name] && errors[name] ? errors[name] : '';
  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: inputTransformValue.value }],
    };
  });

  useEffect(() => {
    if (errorMsg) {
      shakeUI();
    }
  }, [errorMsg]);
  return (
    <Animated.View style={[containerStyle, inputStyle]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.label, { color: 'red' }]}>{errorMsg}</Text>
      </View>
      <View>
        <AppInput
          placeholder={placeholder}
          style={{}}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange(name)}
          value={values[name]}
          onBlur={handleBlur(name)}
        />
        {rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.CONSTRAT,
    padding: 5,
    fontFamily: 'blackItalic',
  },
  rightIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
  },
});

export default AuthInputField;
