import { theme } from "@/theme/theme"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type closeButtonProps = TouchableOpacityProps & {
    onPress: () => void
}

export function CloseButton({ onPress, ...rest }: closeButtonProps) {
    return (
        <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={onPress} {...rest}>
            <Text style={styles.textButton}>FECHAR</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
        padding: 5,
        backgroundColor: theme.colors.black[300],
    },
    textButton: {
        fontFamily: theme.fonts.title,
        fontSize: theme.textSizes.large,
        color: theme.colors.white[300],
        zIndex: 2,
    }
})