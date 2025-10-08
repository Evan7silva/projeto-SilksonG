import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {

    const [fontsLoaded] = useFonts({
        ImFellDoublePica: require("../../assets/fonts/ImFellDoublePica/IMFellDoublePica-Regular.ttf"),
        LibreBaskervilleRegular: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Regular.ttf"),
        LibreBaskervilleItalic: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Italic.ttf"),

    }

    )
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando fontes...</Text>
            </View>
        );
    }
    return (
        <Stack
            screenOptions={{ headerShown: false }} />
    );
}