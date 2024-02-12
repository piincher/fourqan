import { NavigationContainer } from "@react-navigation/native";
import LostPassword from "@views/auth/LostPassword";
import SignIn from "@views/auth/SignIn";
import SignUp from "@views/auth/SignUp";
import Verification from "@views/auth/Verification";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SupabaseProvider } from "context/SupabaseProvider";
import { useFont } from "src/hooks/useFont";
import { AuthNavigator } from "src/navigation/AuthNavigation";

const App = () => {
	const { loadFonts } = useFont();
	if (!loadFonts) {
		return null;
	}

	return (
		<NavigationContainer>
			<SupabaseProvider>
				<AuthNavigator />
			</SupabaseProvider>
		</NavigationContainer>
	);
};

export default App;

const styles = StyleSheet.create({});
