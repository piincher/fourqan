import AppInput from "@ui/AppINput";
import { colors } from "@utils/colors";
import React, { FC } from "react";
import { View, StyleSheet, Text, TextInputProps, StyleProp, ViewStyle } from "react-native";

interface Props {
	placeholder?: string;
	label: string;
	keyboardType?: TextInputProps["keyboardType"];
	autoCapitalize?: TextInputProps["autoCapitalize"];
	secureTextEntry?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onChange: (text: string) => void;
}

const AuthInputField: FC<Props> = (props) => {
	const { placeholder, label, keyboardType, secureTextEntry, containerStyle, onChange } = props;
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.label}>{label}</Text>
			<AppInput
				placeholder={placeholder}
				style={{}}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				onChangeText={onChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	label: {
		color: colors.CONSTRAT,
		padding: 5,
	},
});

export default AuthInputField;
