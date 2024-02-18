import { colors } from '@utils/colors'
import React, { FC } from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

interface Props {
  title: string;
  onPress: () => void;
}

const AppButton: FC<Props> = ({ title, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: colors.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    title: {
        color: colors.PRIMARY,
        fontSize: 18,
    },
})

export default AppButton
