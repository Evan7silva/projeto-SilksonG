import { theme } from "@/theme/theme";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: theme.colors.red[300],
                fontFamily: theme.fonts.title,
                fontSize: theme.textSizes.title
            }}>SILKSONG</Text>
            <Text style={{
                color: theme.colors.black[100],
                fontFamily: theme.fonts.text,
                fontSize: theme.textSizes.large,
                marginTop: theme.spacing.sm,
            }}>starting</Text>
            <Text style={{
                color: theme.colors.gray[100],
                fontFamily: theme.fonts.italic,
                fontSize: theme.textSizes.small,
                marginTop: theme.spacing.xs,
            }}>project</Text>
        </View>
    )
}         