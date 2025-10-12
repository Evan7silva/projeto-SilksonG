import { theme } from '@/theme/theme';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef } from 'react';
import { AppState, Dimensions, StyleSheet, View } from "react-native";

// Definir Dimensions
const { width, height } = Dimensions.get('screen');

// Soucer de video 
const videoSource = require('@/assets/media/background.mp4');

export default function App() {

    // Cria o useVideoPlayer
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
        player.muted = true;
        // otimizar o carregamento e cache
        player.allowsExternalPlayback = false;
    })

    // Refs e controla de estado do App
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscrition = AppState.addEventListener("change", (nextState) => {
            if ( nextState === "active" ) {
                // Retoma o video quando o app volta
                player.play();
            } else {
                // Pausa para evitar travar a reprodução
                player.pause();
            }
            appState.current = nextState;
        });
        return () => subscrition.remove();
    }, [player]);

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={styles.video}
                contentFit="fill"
                nativeControls={false}
            />
            <View style={styles.contenOverlay}>
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