import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { ImageLogo } from "@/components/ImageLogo";
import { theme } from "@/theme/theme";
import { Blazon, listBlazon } from "@/utils";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState } from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ImageViewing from "react-native-image-viewing";


//interface Blazon {
//id: number;
///imageBlazon: ImageSourcePropType;
//}

const arrowLeft = require("@/assets/images/seta/arrowLeft.png");
const arrowRight = require("@/assets/images/seta/arrowRight.png");

const imageBottom = require("@/assets/images/fundo_preto_brilho_50_1080x2400 1.png");

//const listBlazon: Blazon[] = [
//{ id: 1, imageBlazon: require("@/assets/images/blazon/brasao de caçador.png") },
//{ id: 2, imageBlazon: require("@/assets/images/blazon/crista do andarilho.png") },
//{ id: 3, imageBlazon: require("@/assets/images/blazon/cristal da besta.png") },
//{ id: 4, imageBlazon: require("@/assets/images/blazon/arquiteto crest.png") },
//{ id: 5, imageBlazon: require("@/assets/images/blazon/cristal do ceifador.png") },
//{ id: 6, imageBlazon: require("@/assets/images/blazon/brasao da bruxa.png") },
//{ id: 7, imageBlazon: require("@/assets/images/blazon/brasao do xama.png") },
//];

export default function Blasoes() {
    // Modal
    const [showModal, setShowModal] = useState(false)
    // Selected item
    const [selectedItem, setSelectedItem] = useState<Blazon | null>(null)
    // ref para o FlatList
    const listRef = useRef<FlatList<Blazon> | null>(null);
    // índice ativo (antes "blazon")
    const [activeBlazon, setActiveBlazon] = useState<number>(3);

    const scrollTo = (i: number) => {
        // garante que o índice fique dentro do range
        const next = Math.max(0, Math.min(listBlazon.length - 1, i));
        setActiveBlazon(next);
        // propriedade correta: index (lowercase)
        listRef.current?.scrollToIndex({ index: next, animated: true });
    };

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

    function handleButtonModal(item: Blazon) {
        setSelectedItem(item)
        setShowModal(true)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={imageBottom} style={styles.bottom} resizeMode="cover">
                <ImageLogo />
                <View style={styles.content}>
                    <View>
                        <TouchableOpacity
                            onPress={() => scrollTo(activeBlazon - 1)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={arrowLeft}
                                style={{
                                    width: 40,
                                    height: 40,
                                    opacity: activeBlazon === 0 ? 0 : 1,
                                }}
                                resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        ref={listRef}
                        data={listBlazon}
                        horizontal
                        pagingEnabled
                        initialScrollIndex={3}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        getItemLayout={(_, index) => ({
                            length: 320,
                            offset: 320 * index,
                            index,
                        })}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                //key={item.id}
                                activeOpacity={0.7}
                                onPress={() => handleButtonModal(item)}>
                                <Image
                                    source={item.brasao}
                                    style={[
                                        styles.image,
                                        index === activeBlazon ? styles.imageAtiva : styles.imageDesativada,
                                    ]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    <View>
                        <TouchableOpacity
                            onPress={() => scrollTo(activeBlazon + 1)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={arrowRight}
                                style={{
                                    width: 40,
                                    height: 40,
                                    opacity: activeBlazon === 6 ? 0 : 1,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
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
                            <Image
                                source={selectedItem.brasaoVinculado}
                                style={styles.imageModal}
                                resizeMode="contain"
                            />
                            <Text style={styles.textModal}>{selectedItem.textoVinculo}</Text>
                            <Text style={styles.nameBlazonModal}>{selectedItem.nomeBrasao}</Text>
                            <Text style={styles.textDecriptionModal}>{selectedItem.descricaoBrasao}</Text>
                            <Text style={styles.textControlModal}>{selectedItem.controleBrasao}</Text>
                            <Image 
                            source={selectedItem.imageFooterModal}
                            style={{margin: 10, width:20, height:20}}
                            />

                        </View>
                        <View style={styles.contentFooterModal}>
                            <Button title="Localização" onPress={openFullScreen} />
                            <Button title="Voltar" onPress={() => setShowModal(false)} />
                        </View>
                        {isFullScreen && (
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
                                    style={{ position: "absolute" ,alignItems: "flex-end", right: 20, }}
                                    onPress={closeFullScreen}
                                />
                            }
                            />
                        )}
                    </View>
                )}

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    bottom: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
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
        fontFamily: theme.fonts.text,
        fontSize: theme.textSizes.small,
        color: theme.colors.white[300]
    },
    textDecriptionModal: {
        fontFamily: theme.fonts.text,
        fontSize: theme.textSizes.small,
        textAlign: "center",
        color: theme.colors.white[300],
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    textControlModal: {
        fontFamily: theme.fonts.text,
        fontSize: theme.textSizes.small,
        color: theme.colors.white[300],
    },
    nameBlazonModal: {
        fontFamily: theme.fonts.button,
        fontSize: theme.textSizes.title,
        color: theme.colors.white[300]
    }
});