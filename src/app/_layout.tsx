import { theme } from "@/theme/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, Dimensions, Image, StyleSheet, View } from "react-native";

export const { width, height } = Dimensions.get("screen");
const videoSource = require("@/assets/media/background.mp4");

export default function Layout() {
  // Carreaga fontes
  const [fontsLoaded] = useFonts({
    ImFellDoublePica: require("../../assets/fonts/ImFellDoublePica/IMFellDoublePica-Regular.ttf"),
    LibreBaskervilleRegular: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Regular.ttf"),
    LibreBaskervilleItalic: require("../../assets/fonts/LibreBaskerville/LibreBaskerville-Italic.ttf"),
  });

  // Configuração do player de vídeo
  const [isReady, setIsReady] = useState(false);
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.allowsExternalPlayback = false;
  });

  // Garante que o player comece de fato
  useEffect(() => {
    const playVideo = async () => {
      try {
        await player.play();
      } catch (e) {
        console.warn("Erro ao iniciar vídeo:", e);
      }
    };
    playVideo();
  }, [player]);

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") player.play();
      else player.pause();
      appState.current = nextState;
    });
    return () => sub.remove();
  }, [player]);

  // ⏳ Controla o tempo do loader (garante mínimo de 2s)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (fontsLoaded) {
      timer = setTimeout(() => setIsReady(true), 2000);
    }
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // Enquanto carrega fontes → mostra loader
  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <Image
          source={require("@/assets/loader/loaderHornet.gif")}
          style={styles.loaderGif}
        />
        <ActivityIndicator size="large" color="#ff0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <VideoView
        player={player}
        style={styles.videoBackground}
        contentFit="cover"
        nativeControls={false}
      />
      <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: 'transparent'} }} />
    </View>
  );
}

const styles = StyleSheet.create({
  videoBackground: {
    ...StyleSheet.absoluteFillObject, // cobre toda a tela
    zIndex: -1,
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
