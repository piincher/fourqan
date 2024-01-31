import AuthInputField from "@components/AuthInputField";
import AppInput from "@ui/AppINput";
import { colors } from "@utils/colors";
import React, { FC, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Props {}

const SignUp: FC<Props> = () => {
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		password: "",
	});
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.formContainer}>
				<AuthInputField
					label='Name'
					placeholder='Name'
					containerStyle={styles.containerStyle}
					onChange={(text) => setUserInfo({ ...userInfo, name: text })}
				/>
				<AuthInputField
					label='Email'
					placeholder='Email'
					autoCapitalize='none'
					keyboardType='email-address'
					containerStyle={styles.containerStyle}
					onChange={(text) => setUserInfo({ ...userInfo, email: text })}
				/>
				<AuthInputField
					label='Password'
					autoCapitalize='none'
					placeholder='**********'
					secureTextEntry
					containerStyle={styles.containerStyle}
					onChange={(text) => setUserInfo({ ...userInfo, password: text })}
				/>
				<Button title='Sign Up' onPress={() => console.log(userInfo)} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.PRIMARY,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	formContainer: { width: "100%", paddingHorizontal: 15 },

	containerStyle: {
		marginBottom: 20,
	},
});

export default SignUp;
