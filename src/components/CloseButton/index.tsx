import { theme } from "@/theme/theme"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type closeButtonProps = TouchableOpacityProps & {
    title: string
    onPress: () => void
}

export function CloseButton({ onPress, title, ...rest }: closeButtonProps) {
    return (
        <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={onPress} {...rest}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        top: 35,
        right: 20,
        zIndex: 40,
    },
    textButton: {
        fontFamily: theme.fonts.button,
        fontSize: theme.textSizes.large,
        color: theme.colors.white[300],
    }
})