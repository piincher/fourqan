import LostPassword from "@views/auth/LostPassword";
import SignIn from "@views/auth/SignIn";
import SignUp from "@views/auth/SignUp";
import Verification from "@views/auth/Verification";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const App = () => {
	const [loadFonts, setLoadFonts] = React.useState(false);

	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				black: require("./assets/fonts//Roboto-Black.ttf"),
				blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
				bold: require("./assets/fonts/Roboto-Bold.ttf"),
				boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
				italic: require("./assets/fonts/Roboto-Italic.ttf"),
				light: require("./assets/fonts/Roboto-Light.ttf"),
				lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
				medium: require("./assets/fonts/Roboto-Medium.ttf"),
				mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
				regular: require("./assets/fonts/Roboto-Regular.ttf"),
				thin: require("./assets/fonts/Roboto-Thin.ttf"),
				thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
			});
			setLoadFonts(true);
		};

		loadFonts();
	});
	if (!loadFonts) {
		return null;
	}

	return <Verification />;
};

export default App;

const styles = StyleSheet.create({});
