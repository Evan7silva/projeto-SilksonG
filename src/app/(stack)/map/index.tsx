import { Button } from "@/components/Button"
import { CloseButton } from "@/components/CloseButton"
import { ImagemButton } from "@/components/ImageButton"
import { ImageLogo } from "@/components/ImageLogo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import * as ScreenOrientation from "expo-screen-orientation"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import ImageZoomLib from "react-native-image-pan-zoom"
const ImageZoom = ImageZoomLib as any


const imagemBottom = require("@/assets/images/imagem_formato_mobile-2x.png")
const imageMap = require("@/assets/images/map.png")
const imageMarker = require("@/assets/images/marker16x16.png")
const imageButtonMarker = require("@/assets/images/buttonMarker64x64.png")
const imageZoomMap = require("@/assets/images/zoomMap.png")

const { width, height } = Dimensions.get("screen")

export default function Map() {

  const [isFullScreen, setFullScreen] = useState(false)
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([])
  const [isAddingMarker, setIsAddingMarker] = useState(false)
  const [activeButton, setActiveButton] = useState<"zoom" | "marker">("zoom")


  // Carregar marcadores salvos
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("mapMarkers")
        if (saved) {
          setMarkers(JSON.parse(saved))
        }
      } catch (error) {
        console.warn("Erro ao carregar marcadores:", error)
      }
    })()
  }, [])

  // Salvar marcadores
  const saveMarkers = async (data: { x: number; y: number }[]) => {
    try {
      await AsyncStorage.setItem("mapMarkers", JSON.stringify(data))
    } catch (error) {
      console.warn("Erro ao salvar marcadores:", error)
    }
  }

  // Adicionar marcador
  const handleAddMarker = (event: any) => {
    const { locationX, locationY } = event.nativeEvent
    const relativeX = locationX / width
    const relativeY = locationY / height
    const newMarkers = [...markers, { x: relativeX, y: relativeY }]
    setMarkers(newMarkers)
    saveMarkers(newMarkers)
  }

  // Remover marcador
  const handleRemoveMarker = (index: number) => {
    const updated = markers.filter((_, i) => i !== index)
    setMarkers(updated)
    saveMarkers(updated)
  }

  // Resetar todos os marcadores
  const resetMarkers = async () => {
    await AsyncStorage.removeItem("mapMarkers") // apaga do armazenamento
    setMarkers([]) // limpa do estado atual
  }

  // Tela cheia
  const openFullScreen = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      setFullScreen(true)
    } catch (error) {
      console.warn("Erro ao abrir tela cheia:", error)
    }
  }

  // Tela fechada
  const closeFullScreen = async () => {
    setFullScreen(false)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={imagemBottom} style={styles.styleImage} resizeMode="cover">
        <ImageLogo />
        <View style={styles.content}>
          <Button title="Abrir Mapa" onPress={openFullScreen} />
          {/*<Button title="RESETAR MARCADORES" onPress={resetMarkers} />*/}
          <Button title="Voltar" onPress={() => router.back()} />
        </View>
      </ImageBackground>

      {/* Tela Abrir Mapa */}
      <Modal
        visible={isFullScreen}
        animationType="fade"
        transparent={false}
        onRequestClose={closeFullScreen} // Android botão voltar
        statusBarTranslucent={true} // deixa a barra do topo visível
      >
        <View style={styles.fullscreen}>
          {/* Button Marcar Mapa */}
          <ImagemButton
            source={imageButtonMarker}
            onPress={() => {
              setIsAddingMarker(true)
              setActiveButton("marker")
            }}
            style={{
              position: "absolute",
              top: 40,
              left: 5,
              zIndex: 40,
              opacity: activeButton === "marker" ? 1 : 0.5,
            }}
          />

          {/* Button Notifica Zoom */}
          <ImagemButton
            source={imageZoomMap}
            onPress={() => {
              setIsAddingMarker(false)
              setActiveButton("zoom")
            }}
            style={{
              position: "absolute",
              top: 50,
              left: 80,
              zIndex: 40,
              opacity: activeButton === "zoom" ? 1 : 0.5,
            }}
          />

          {/* Button Fechar Mapa */}
          <CloseButton title="Fechar" onPress={closeFullScreen} />

          {/* Lib que gerencia toda funcionalidade sobre Mapa */}
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
            enableDoubleClickZoom={false}
            pinchToZoom={true}
            minScale={1}
            maxScale={10}
          >
            <View style={styles.contentMap}>

              {/* Image Mapa */}
              <Image
                style={{ width: width * 1.1, height: height * 1.1, resizeMode: "contain" }}
                source={imageMap}
              />

              {/* Gerencia Marcadores visuais */}
              {markers.map((m, i) => (
                <View
                  key={i}
                  style={{
                    position: "absolute",
                    left: m.x * width - 3,
                    top: m.y * height - 3,
                    zIndex: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveMarker(i)}
                    activeOpacity={0.8}
                    disabled={!isAddingMarker}
                  >
                    <Image
                      source={imageMarker}
                      style={{ width: 6, height: 6, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Modo de adicionar marcador */}
              {isAddingMarker && (
                <View style={styles.touchLayer} pointerEvents="box-none">
                  <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleAddMarker}
                  />
                </View>
              )}
            </View>
          </ImageZoom>
        </View>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
    gap: 10,
  },
  styleImage: {
    flex: 1,
    width,
    height,
  },
  fullscreen: {
    backgroundColor: "black",
  },
  touchLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  contentMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
