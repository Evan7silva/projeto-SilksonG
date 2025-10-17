import { Button } from "@/components/Button"
import { CloseButton } from "@/components/CloseButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import * as ScreenOrientation from "expo-screen-orientation"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import ImageZoomLib from "react-native-image-pan-zoom"
const ImageZoom = ImageZoomLib as any


const imagemBottom = require("@/assets/images/Hornet_sem_faiscas.png")
const imagemMap = require("@/assets/images/map.png")
const imageLogo = require("@/assets/images/silksong_logo_white-fs8.png")
const imageMarker = require("@/assets/images/marker16x16.png")

const { width, height } = Dimensions.get("screen")

export default function Map() {

  const [isFullScreen, setFullScreen] = useState(false)
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([])
  const [isAddingMarker, setIsAddingMarker] = useState(false)


  // 🔁 Carregar marcadores salvos
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

  // 💾 Salvar marcadores
  const saveMarkers = async (data: { x: number; y: number }[]) => {
    try {
      await AsyncStorage.setItem("mapMarkers", JSON.stringify(data))
    } catch (error) {
      console.warn("Erro ao salvar marcadores:", error)
    }
  }

  // 🖱️ Adicionar marcador
  const handleAddMarker = (event: any) => {
    const { locationX, locationY } = event.nativeEvent
    const relativeX  = locationX / width 
    const relativeY  = locationY / height 
    const newMarkers = [...markers, { x: relativeX, y: relativeY  }]
    setMarkers(newMarkers)
    saveMarkers(newMarkers)
  }

  // ❌ Remover marcador
  const handleRemoveMarker = (index: number) => {
    const updated = markers.filter((_, i) => i !== index)
    setMarkers(updated)
    saveMarkers(updated)
  }
  // 🧹 Resetar todos os marcadores
  const resetMarkers = async () => {
    await AsyncStorage.removeItem("mapMarkers") // apaga do armazenamento
    setMarkers([]) // limpa do estado atual
  }

  // 🧭 Tela cheia
  const openFullScreen = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      setFullScreen(true)
    } catch (error) {
      console.warn("Erro ao abrir tela cheia:", error)
    }
  }

  const closeFullScreen = async () => {
    setFullScreen(false)
  }

  return (
    <View style={styles.container}>
      {!isFullScreen && (
        <ImageBackground source={imagemBottom} style={styles.styleImage} resizeMode="cover">
          <Image style={{ width: "auto", height: 200, marginTop: 20 }} source={imageLogo} />
          <View style={styles.content}>
            <Button title="ABRIR MAPA" onPress={openFullScreen} />
            <Button title="RESETAR MARCADORES" onPress={resetMarkers} />
            <Button title="VOLTAR" onPress={() => router.back()} />
          </View>
        </ImageBackground>
      )}

      {isFullScreen && (
        <View style={styles.fullscreen}>
          <CloseButton title="FECHAR" onPress={closeFullScreen} />
          <CloseButton
            title="MARCADOR"
            style={{ position: "absolute", top: 30, zIndex: 40 }}
            onPress={() => setIsAddingMarker(true)} />
          <CloseButton
            title="MOVER MAPA"
            style={{ position: "absolute", top: 80, zIndex: 40 }}
            onPress={() => setIsAddingMarker(false)} />

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
            <View style= {{flex: 1, alignContent: "center", alignItems: "center"}}>
              <Image
                style={{ width: width * 1.1, height: height * 1.1, resizeMode: "contain" }}
                source={imagemMap}
              />

              {/* 🔴 Marcadores visuais */}
              {markers.map((m, i) => (
                <View
                
                  key={i}
                  style={{
                    position: "absolute",
                    left: m.x * width - 3,
                    top: m.y * height - 3,
                    zIndex: 25,
                  }}
                  pointerEvents="box-none"
                  >
                  <TouchableOpacity
                  onPress={() => handleRemoveMarker(i)}
                  activeOpacity={0.8}
                >
                  <Image
                   source={imageMarker}
                    style={{ width: 6, height: 6, resizeMode: "contain"}}
                    
                  />
                </TouchableOpacity>
                </View>
              ))}

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
      )}

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
    flex: 1,
    backgroundColor: "black",
  },
  marker: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderWidth: 0.5,
    borderColor: "white",
    zIndex: 20, // garante estar acima visualmente
  },
  touchLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 10,
  },


})
