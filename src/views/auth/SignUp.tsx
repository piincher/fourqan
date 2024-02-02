import AuthInputField from "@components/form/AuthInputField";
import Form from "@components/form";
import { Entypo } from "@expo/vector-icons";

import { colors } from "@utils/colors";
import React, { FC } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import SubmitBtn from "@components/form/SubmitBtn";
import PasswordVisibilityIcon from "@ui/PasswordVisibilityIcon";
import AppLink from "@ui/AppLink";
const signupSchema = yup.object({
	name: yup.string().trim().required("Name is required").min(3, "Name must be at least 3 characters"),
	email: yup.string().trim("").email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.trim("password is missing")
		.min(8, "Password is too short")
		.required("Password is required")
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too weak"),
});

interface Props {}
const initialValues = {
	name: "",
	email: "",
	password: "",
};

const SignUp: FC<Props> = () => {
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	return (
		<SafeAreaView style={styles.container}>
			<Form
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log(values);
				}}
				validationSchema={signupSchema}
			>
				<View style={styles.formContainer}>
					<AuthInputField label='Name' placeholder='Name' containerStyle={styles.containerStyle} name='name' />
					<AuthInputField
						label='Email'
						placeholder='Email'
						autoCapitalize='none'
						keyboardType='email-address'
						containerStyle={styles.containerStyle}
						name='email'
					/>
					<AuthInputField
						name='password'
						label='Password'
						autoCapitalize='none'
						placeholder='**********'
						secureTextEntry={secureTextEntry}
						containerStyle={styles.containerStyle}
						rightIcon={<PasswordVisibilityIcon privateIcon={secureTextEntry} />}
						onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
					/>
					<SubmitBtn title='Sign Up' />
					<View style={styles.link}>
						<AppLink title='I lost my password' onPress={() => console.log("Sign in")} />
						<AppLink title='Sign in' />
					</View>
				</View>
			</Form>
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
	link: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default SignUp;
