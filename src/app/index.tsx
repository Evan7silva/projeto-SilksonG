import { theme } from '@/theme/theme';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Dimensions, StyleSheet, Text, View } from "react-native";

// Definir Dimensions
const { width, height } = Dimensions.get('screen')

// Soucer de video 
const videoSource = require('@/assets/media/background.mp4')

export default function App() {

    // Cria o useVideoPlayer
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true
        player.play()
        player.muted = true
        // otimizar o carregamento e cache
        player.allowsExternalPlayback = false;
    })
    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={styles.video}
                contentFit="fill"
                nativeControls={false}
            />
            <View style={styles.contenOverlay}>
                <Text style={styles.text}>SEGUE</Text>
                <Text style={styles.text}>CURTE</Text>
                <Text style={styles.text}>COMPARTILHA</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        position: 'absolute',
        width,
        height,
        top: 0,
        left: 0,
        zIndex: -1,
    },
    contenOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent'
    },
    text: {
        fontFamily: theme.fonts.title,
        fontSize: theme.textSizes.title,
        color: theme.colors.white[100],
    }
})