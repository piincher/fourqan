import CircleUI from "@ui/CircleUI";
import { colors } from "@utils/colors";
import { fonts } from "@utils/fonts";
import { Image } from "expo-image";
import React, { FC, ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
	title: string;
	subTitle: string;
	children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({ title, subTitle, children }) => {
	console.log(title, subTitle);
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<>
				<CircleUI size={200} position='top-left' />
				<CircleUI size={100} position='top-right' />
				<CircleUI size={200} position='bottom-right' />
				<CircleUI size={100} position='bottom-left' />
				<View style={styles.headerContainer}>
					<Image source={require("../../assets/logo.png")} style={{ height: 80, width: 200 }} />
					<Text style={styles.heading}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
				</View>
				{children}
			</>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 15,
		backgroundColor: colors.PRIMARY,
	},
	heading: {
		fontSize: 25,
		fontFamily: fonts.bold,
		fontWeight: "bold",
		color: colors.SECONDARY,
		paddingVertical: 5,
	},
	subTitle: {
		fontSize: 15,
		fontFamily: fonts.regular,
		color: colors.CONSTRAT,
	},
	headerContainer: { width: "100%", marginBottom: 20 },
});

export default AuthFormContainer;
