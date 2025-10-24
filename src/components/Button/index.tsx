
import { theme } from "@/theme/theme"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type buttonProps = TouchableOpacityProps & {
    title: string
}

export function Button({ title, ...rest }: buttonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "auto",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        fontFamily: theme.fonts.button,
        fontSize: theme.textSizes.large,
        color: theme.colors.white[300],

    },
})