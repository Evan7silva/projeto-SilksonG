import { height, width } from "@/app";
import { router } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'; // Instalar pacote
import { useState } from "react";
import { Button, Image, ImageBackground, StyleSheet, View } from "react-native";
import ImageViewing from "react-native-image-viewing"; // Instalar pacote

const imagemBottom = require("@/assets/images/bottom.png")
const imagemMap = require("@/assets/images/map.png")

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
                <View style={styles.content}>
                    <Button title="ABRIR MAP" onPress={openFullScreen} />
                    <Button title="Voltar" onPress={() => router.back()} />
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
                    HeaderComponent={() => <Button title="FECHAR" onPress={closeFullScreen}/>}
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
        justifyContent: "center",
        alignItems: "center"
    },
    styleImage: {
        flex: 1,
        width,
        height,
    }
})