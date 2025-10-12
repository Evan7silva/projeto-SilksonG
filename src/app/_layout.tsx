import { theme } from "@/theme/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function Layout() {

    const [fontsLoaded] = useFonts({
        ImFellDoublePica: require("../../assets/fonts/ImFellDoublePica/IMFellDoublePica-Regular.ttf"),
        LibreBaskervilleRegular: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Regular.ttf"),
        LibreBaskervilleItalic: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Italic.ttf"),

    })

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>

        if (fontsLoaded) {
            // Garante que o loader apareça por pelo menos 2 segundos
            timer = setTimeout(() => {
                setIsReady(true)
            }, 2000);
        }
        return () => clearTimeout(timer)
    }, [fontsLoaded])

    if (!isReady) {
        return (
            <View style={styles.container}>
                <Image
                    source={require("@/assets/loader/loaderHornet.gif")}
                    style={styles.loader}
                />
                <ActivityIndicator size={"large"} color={"#ff0000ff"} />
            </View>
        );
    }
    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.black[300]
    },
    loader: {
        width: 220,
        height: 220,
        resizeMode: "contain",
    }
})