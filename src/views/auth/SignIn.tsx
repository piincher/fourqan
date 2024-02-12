import AuthFormContainer from "@components/AuthFormContainer";
import Form from "@components/form";
import AuthInputField from "@components/form/AuthInputField";
import SubmitBtn from "@components/form/SubmitBtn";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import AppLink from "@ui/AppLink";
import PasswordVisibilityIcon from "@ui/PasswordVisibilityIcon";
import React, { FC, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AuthNavigationProps } from "src/@types/navigation";
import * as yup from "yup";
import auth from "@react-native-firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSupabase } from "src/hooks/useSupabase";
import * as SecureStore from "expo-secure-store";

const signupSchema = yup.object({
	email: yup.string().trim("").email("Invalid email").required("Email is required"),
	password: yup.string().trim("password is missing").min(8, "Password is too short").required("Password is required"),
});

const initialValues = {
	email: "",
	password: "",
};

const SignIn = ({ navigation }: AuthNavigationProps) => {
	const { getGoogleOAuthUrl, setOAuthSession } = useSupabase();
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const [loading, setLoading] = useState(false);

	React.useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	useEffect(() => {}, []);

	const signInWithGoogle = async () => {
		setLoading(true);
		try {
			const url = await getGoogleOAuthUrl();
			if (!url) return;

			const result = await WebBrowser.openAuthSessionAsync(url, "fourqan://google-auth", {
				showInRecents: true,
			});
			if (result.type === "success") {
				const data = extractParamsFromUrl(result.url);

				if (!data.access_token || !data.refresh_token) return;

				setOAuthSession({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
				});

				SecureStore.setItemAsync("google-access-token", JSON.stringify(data.provider_token));
			}
		} catch (error) {
			// Handle error here
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const extractParamsFromUrl = (url: string) => {
		console.log("url", url);
		const params = new URLSearchParams(url.split("#")[1]);
		const data = {
			access_token: params.get("access_token"),
			expires_in: parseInt(params.get("expires_in") || "0"),
			refresh_token: params.get("refresh_token"),
			token_type: params.get("token_type"),
			provider_token: params.get("provider_token"),
		};

		return data;
	};
	return (
		<Form
			initialValues={initialValues}
			onSubmit={(values) => {
				console.log(values);
			}}
			validationSchema={signupSchema}
		>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Button title='Google sign' onPress={signInWithGoogle} />
			</View>
			{/* <AuthFormContainer title='Ravi de vous revoir' subTitle='Connectez-Vous'>
				<View style={styles.formContainer}>
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
					<SubmitBtn title='Se Connecter' />
					<View style={styles.link}>
						<AppLink title="J'ai perdu mon mot de passe" onPress={() => navigation.navigate("LostPassword")} />
						<AppLink
							title="S'inscrire"
							onPress={() => {
								navigation.navigate("SignUp");
							}}
						/>
					</View>
				</View>
			</AuthFormContainer> */}
		</Form>
	);
};

const styles = StyleSheet.create({
	formContainer: { width: "100%" },

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

export default SignIn;
