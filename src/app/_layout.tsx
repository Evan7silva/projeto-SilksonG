import { theme } from "@/theme/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, Dimensions, Image, StyleSheet, View } from "react-native";

export const { width, height } = Dimensions.get("screen");
const videoSource = require("@/assets/media/video_2025-10-15_12-29-11.mp4");

export default function Layout() {
  // Carreaga fontes
  const [fontsLoaded] = useFonts({
    ImFellDoublePica: require("../../assets/fonts/ImFellDoublePica/IMFellDoublePica-Regular.ttf"),
    ImFellFrenchCanonSC: require("../../assets/fonts/ImFellFrenchCanonSC/IMFellFrenchCanonSC-Regular.ttf"),
    Cinzel: require("../../assets/fonts/Cinzel/Cinzel-SemiBold.ttf"),
    LibreBaskervilleRegular: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Regular.ttf"),
    LibreBaskervilleItalic: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Italic.ttf"),
  });

  // Configuração do player de vídeo
  const [isReady, setIsReady] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.allowsExternalPlayback = false;
    // Tenta iniciar a reprodução imediatamente após a criação do player
    player.play();
  });

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        player.play();
      } else player.pause();
      appState.current = nextState;
    })
    return () => sub.remove();
  }, [player])

  // ⏳ Controla o tempo do loader (garante mínimo de 2s)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (fontsLoaded) {
      timer = setTimeout(() => setIsReady(true), 2000)
    }
    return () => clearTimeout(timer);
  }, [fontsLoaded])

  // Enquanto carrega fontes → mostra loader
  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <Image
          source={require("@/assets/loader/loaderHornet.gif")}
          style={styles.loaderGif}
        />
        <ActivityIndicator size="large" color={theme.colors.red[100]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.videoBackground}
        contentFit="fill"
        nativeControls={false}
      />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject, // cobre toda a tela
    zIndex: -1,
    position: "absolute",
    right: -7,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black[300],
  },
  loaderGif: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
