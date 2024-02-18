import { colors } from '@utils/colors';
import { fonts } from '@utils/fonts';
import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  ref: unknown;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => (
    <TextInput
        {...props}
        ref={ref}
        style={[styles.input, props.style]}
        placeholderTextColor={colors.INACTIVE_CONSTRAT}
    />
));

OTPField.displayName = 'OTPField'; // Add display name

export default OTPField;

const styles = StyleSheet.create({
    container: {},
    input: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        textAlign: 'center',
        color: colors.CONSTRAT,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: fonts.black,
    },
});
