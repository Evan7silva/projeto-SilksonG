import { Button } from "@/components/Button";
import { ImageLogo } from "@/components/ImageLogo";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

interface Blazon {
    id: number;
    imageBlazon: ImageSourcePropType;
}

const arrowLeft = require("@/assets/images/seta/arrowLeft.png");
const arrowRight = require("@/assets/images/seta/arrowRight.png");

const imageBottom = require("@/assets/images/fundo_preto_brilho_50_1080x2400 1.png");

const listBlazon: Blazon[] = [
    { id: 1, imageBlazon: require("@/assets/images/blazon/brasao de caçador.png") },
    { id: 2, imageBlazon: require("@/assets/images/blazon/crista do andarilho.png") },
    { id: 3, imageBlazon: require("@/assets/images/blazon/cristal da besta.png") },
    { id: 4, imageBlazon: require("@/assets/images/blazon/arquiteto crest.png") },
    { id: 5, imageBlazon: require("@/assets/images/blazon/cristal do ceifador.png") },
    { id: 6, imageBlazon: require("@/assets/images/blazon/brasao da bruxa.png") },
    { id: 7, imageBlazon: require("@/assets/images/blazon/brasao do xama.png") },
];

export default function Blasoes() {
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
                            length: 320, // largura total de cada item (width + marginHorizontal)
                            offset: 320 * index,
                            index,
                        })}
                        renderItem={({ item, index }) => (
                            <Image
                                source={item.imageBlazon}
                                style={[
                                    styles.image,
                                    index === activeBlazon ? styles.imageAtiva : styles.imageDesativada,
                                ]}
                                resizeMode="contain"
                            />
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
});