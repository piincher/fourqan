import AppButton from "@ui/AppButton";
import { useFormikContext } from "formik";
import React, { FC } from "react";
import { View, StyleSheet, Button } from "react-native";

interface Props {
	title: string;
}

const SubmitBtn: FC<Props> = (props: Props) => {
	const { handleSubmit } = useFormikContext();
	return <AppButton title={props.title} onPress={handleSubmit} />;
};

const styles = StyleSheet.create({
	container: {},
});

export default SubmitBtn;
