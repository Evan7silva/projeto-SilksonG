import { height, width } from "@/app/_layout";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { router } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'; // Instalar pacote
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import ImageViewing from "react-native-image-viewing"; // Instalar pacote

const imagemBottom = require("@/assets/images/Hornet_sem_faiscas.png")
const imagemMap = require("@/assets/images/map.png")
const imageLogo = require("@/assets/images/silksong_logo_white-fs8.png")

export default function Map() {

    const [isFullScreen, setFullScreen] = useState(false)

    const openFullScreen = async () => {

        try {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            )
            setFullScreen(true)
        } catch (error) {
            console.warn("Erro ao abrir tela cheia: ", error)
        }
    }

    const closeFullScreen = async () => {
        setFullScreen(false)
    }

    return (
        <View style={styles.container}>
           
                
            
            <ImageBackground
                source={imagemBottom}
                style={styles.styleImage}
                resizeMode="cover"
            >
                <Image style={{width: "auto", height: 200, marginTop: 20}} source={imageLogo}/>
                <View style={styles.content}>
                    <Button title="ABRIR MAPA" onPress={openFullScreen} />
                    <Button title="VOLTAR" onPress={() => router.back()} />
                </View>
            </ImageBackground>
            {isFullScreen && (
                <ImageViewing
                    images={[{ uri: Image.resolveAssetSource(imagemMap).uri }]}
                    imageIndex={0}
                    visible={isFullScreen}
                    onRequestClose={closeFullScreen}
                    presentationStyle="fullScreen"
                    backgroundColor="black"
                    swipeToCloseEnabled={false}
                    doubleTapToZoomEnabled={true}
                    HeaderComponent={() => (
                        <CloseButton onPress={closeFullScreen} />
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
})