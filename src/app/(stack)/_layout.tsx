import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Router() {
    return (
        <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})