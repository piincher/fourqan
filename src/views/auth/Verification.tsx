import AuthFormContainer from "@components/AuthFormContainer";
import SubmitBtn from "@components/form/SubmitBtn";
import AppButton from "@ui/AppButton";
import AppLink from "@ui/AppLink";
import OTPField from "@ui/OTPField";
import React, { FC, useEffect, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";

interface Props {}

const otpFields = new Array(6).fill("");

const Verification: FC<Props> = () => {
	const [otp, setOtp] = useState<string[]>([...otpFields]);
	const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
	const inputRef = React.useRef<TextInput>(null);
	const handleChange = (value: string, index: number) => {
		const newOtp = [...otp];

		if (value === "Backspace" && index !== 0) {
			if (!newOtp[index]) {
				setActiveOtpIndex(index - 1);
			}
			newOtp[index] = "";
		} else if (value !== "Backspace") {
			setActiveOtpIndex(index + 1);
			newOtp[index] = value;
		}

		setOtp(newOtp);
	};

	const handlePaste = (value: string) => {
		if (value.length === 6) {
			Keyboard.dismiss();
			const newOtp = value.split("");
			setOtp([...newOtp]);
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	return (
		<AuthFormContainer title='Regarde votre telephone' subTitle='Reinitialise votre mot de passe'>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					{otpFields.map((_, index) => {
						return (
							<OTPField
								keyboardType='numeric'
								key={index}
								ref={activeOtpIndex === index ? inputRef : null}
								onKeyPress={({ nativeEvent }) => {
									handleChange(nativeEvent.key, index);
								}}
								value={otp[index] || ""}
								onChangeText={handlePaste}
							/>
						);
					})}
				</View>

				<AppButton title='Confirmez' onPress={() => {}} />

				<View style={styles.linkContainer}>
					<AppLink title='Renvoyez' onPress={() => console.log("Sign in")} />
				</View>
			</View>
		</AuthFormContainer>
	);
};

const styles = StyleSheet.create({
	formContainer: { width: "100%" },

	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginBottom: 20,
	},
	linkContainer: {
		marginTop: 20,
		width: "100%",
		alignItems: "flex-end",
	},
});

export default Verification;
