import { Button } from "@/components/Button";
import { ImageLogo } from "@/components/ImageLogo";
import { theme } from "@/theme/theme";
import { ListTools, listTools } from "@/utils/listTools";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState } from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

const imageBottom = require("@/assets/images/fundo_preto_brilho_1080x2400.png");

export default function Tools() {
    // Modal
    const [showModal, setShowModal] = useState(false)
    // Selected item
    const [selectedItem, setSelectedItem] = useState<ListTools | null>(null)
    // ref para o FlatList
    const listRef = useRef<FlatList<ListTools> | null>(null);

    // Abertura image localização 
    const [isFullScreen, setIsFullScreen] = useState(false);

    const openFullScreen = async () => {
        try {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            );
            setIsFullScreen(true);
        } catch (error) {
            console.warn("Erro ao abrir tela cheia: ", error);
        }
    }

    const closeFullScreen = async () => {
        setIsFullScreen(false);
    }

    function handleButtonModal(item: ListTools) {
        setSelectedItem(item)
        setShowModal(true)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={imageBottom} style={styles.bottom} resizeMode="cover">
                <ImageLogo />
                <View style={styles.content}>
                    <Image
                        source={require("@/assets/images/divisor/image 2.png")}
                        style={{ width: 330, height: 40 }}
                    />
                    <FlatList
                        ref={listRef}
                        data={listTools}
                        renderItem={({ item, index }) => (
                            <View >
                                
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={item.imageTools}
                                        style={{ width: 50, height: 50, margin: 10 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                {/* 👇 Adiciona o divisor depois de um certo índice */}
                                {index === 5 && (
                                        <Image
                                            source={require("@/assets/images/divisorSkils/Red_Tools_Heading.png")}
                                            style={{
                                                width: "auto",
                                                height: 40,
                                                marginLeft: -140,
                                                resizeMode: "contain"
                                            }}
                                        />
                                    
                                )}
                                {index === 29 && (
                                        <Image
                                            source={require("@/assets/images/divisorSkils/Blue_Tools_Heading.png")}
                                            style={{
                                                width: "auto",
                                                height: 40,
                                                marginLeft: -140,
                                                resizeMode: "contain"
                                            }}
                                        />
                                    
                                )}
                                {index === 53 && (
                                        <Image
                                            source={require("@/assets/images/divisorSkils/Yellow_Tools_Heading.png")}
                                            style={{
                                                width: "auto",
                                                height: 40,
                                                marginLeft: -140,
                                                resizeMode: "contain"
                                            }}
                                        />
                                    
                                )}
                            </View>
                        )}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center",
                        }}

                    />
                    <Image
                        source={require("@/assets/images/divisor/image 6.png")}
                        style={{ width: 330, height: 20 }}
                    />
                </View>
                <View style={styles.contentFooter}>
                    <Button title="Voltar" onPress={() => router.back()} />
                </View>
            </ImageBackground>
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                statusBarTranslucent={true}
                onRequestClose={() => setShowModal(false)}
            >
                {selectedItem && (
                    <View style={styles.modal}>
                        <ImageLogo />
                        <View style={styles.contentModal}>


                        </View>
                        <View style={styles.contentFooterModal}>
                            <Button title="Localização" onPress={openFullScreen} />
                            <Button title="Voltar" onPress={() => setShowModal(false)} />
                        </View>
                        {/*{isFullScreen && (
                            <ImageViewing
                                images={[{ uri: Image.resolveAssetSource(selectedItem.localizacao).uri }]}
                                imageIndex={0}
                                visible={isFullScreen}
                                onRequestClose={closeFullScreen}
                                presentationStyle="fullScreen"
                                backgroundColor="black"
                                swipeToCloseEnabled={false}
                                doubleTapToZoomEnabled={true}
                                HeaderComponent={() => <CloseButton
                                    title="Fechar"
                                    style={{ position: "absolute", alignItems: "flex-end", right: 20, }}
                                    onPress={closeFullScreen}
                                />
                                }
                            />
                        )}*/}
                    </View>
                )}

            </Modal>

        </View>
    );
}

const textSizesSmall = {
    fontFamily: theme.fonts.text,
    fontSize: theme.textSizes.small,
    color: theme.colors.white[300]
}

const textSizesTitle = {
    fontFamily: theme.fonts.text,
    fontSize: theme.textSizes.small,
    color: theme.colors.white[300]
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    bottom: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: "center"
    },
    image: {
        width: 260,
        height: 260,
        margin: 30,
    },
    imageAtiva: {
        transform: [{ scale: 1 }],
        opacity: 1,
    },
    imageDesativada: {
        transform: [{ scale: 0.8 }],
        opacity: 0.4,
    },
    contentFooter: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 100,
    },
    modal: {
        flex: 1,
        backgroundColor: theme.colors.black[300]
    },
    contentModal: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    contentFooterModal: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 52,
    },
    imageModal: {
        width: 260,
        height: 260,
    },
    textModal: {
        ...textSizesSmall
    },
    textDecriptionModal: {
        ...textSizesSmall,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    textControlModal: {
        ...textSizesSmall
    },
    nameBlazonModal: {
        ...textSizesTitle
    }
});