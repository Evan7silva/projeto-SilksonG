import { height, width } from "@/app/_layout";
import { colors } from "@/theme/colors";
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
                    <Button
                        title="ABRIR MAP"
                        color={
                            colors.red[300]}
                        onPress={openFullScreen} />
                    <Button
                        title="Voltar"
                        color={
                            colors.red[300]}
                        onPress={() => router.back()} />
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
                        <View style={styles.button}>
                            <Button
                                title="FECHAR"
                                color={
                                    colors.red[300]}
                                onPress={closeFullScreen}
                            />
                        </View>
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
    button: {
        position: "absolute",
        top: 20,
        right: 20,
        padding: 5,
        borderRadius: 10,
        zIndex: 10, // Garante que fique acima da imagem
    }
})