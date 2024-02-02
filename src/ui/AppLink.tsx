import { colors } from "@utils/colors";
import React, { FC } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface Props {
	title: string;
	onPress: () => void;
}

const AppLink: FC<Props> = ({ title, onPress }) => {
	return (
		<Pressable onPress={onPress}>
			<Text>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	title: {
		color: colors.SECONDARY,
	},
});

export default AppLink;
