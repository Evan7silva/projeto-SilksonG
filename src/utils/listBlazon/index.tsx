import { ImageSourcePropType } from "react-native";

export type Blazon = {
    id: number
    brasao: ImageSourcePropType
    brasaoVinculado: ImageSourcePropType
    textoVinculo: string
    nomeBrasao: string
    descricaoBrasao: string
    controleBrasao?: string
    imageFooterModal: ImageSourcePropType
    localizacao: ImageSourcePropType
};

export const listBlazon: Blazon[] = [
    {
        id: 1,
        brasao: require("@/assets/images/blazon/brasao de caçadora.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/caçadora.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Caçadora",
        descricaoBrasao: "Golpele os inimigos repetidamente para acumular foco. Uma vez acumulado, ataques de agulha se tomarão mais letais.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Brasão de Caçadora.jpg"),
    },
    {
        id: 2,
        brasao: require("@/assets/images/blazon/crista do viajante.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/viajante.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Viajante",
        descricaoBrasao: "Corte de maneira ágil e rápida com golpes curtos e precisos. Para trocar de Brasão, abra a tela Brasão no Menu enquanto descansa em um banco.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Brasão do Viajante.jpg"),
    },
    {
        id: 3,
        brasao: require("@/assets/images/blazon/cristal da besta.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/besta.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Besta",
        descricaoBrasao: "Rasgue inimigos com golpes violentos. Vincule para entrar em uma fúria selvagem e roubar vida da presa. Para trocar de Brasão, abra a tela Brasão no Menu enquanto descansa em um banco.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Crista da Besta.jpg"),
    },
    {
        id: 4,
        brasao: require("@/assets/images/blazon/arquiteto crest.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/arquiteto.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Arquiteto",
        descricaoBrasao: "Gire a agulha como um parafuso, rasgando os inimigos. Use Seda para fabricar rapidamente novas ferramentas.",
        controleBrasao: "Pressione CIMA + B",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Cresta do Arquiteto.jpg"),
    },
    {
        id: 5,
        brasao: require("@/assets/images/blazon/cristal do ceifador.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/ceifador.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Ceifador",
        descricaoBrasao: "Ataque com golpes pesados e curvos, e colha Seda adicional dos inimigos. Para trocar de Brasão, abra a tela Brasão no Menu enquanto descansa em um banco.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Crista do Ceifador.jpg"),
    },
    {
        id: 6,
        brasao: require("@/assets/images/blazon/brasao da bruxa.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/bruxa.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Bruxa",
        descricaoBrasao: "Agite a agulha em golpes amplos. Sugue a vida dos inimigos através de raízes retorcidas.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Brasão de Bruxa.jpg"),
    },
    {
        id: 7,
        brasao: require("@/assets/images/blazon/brasao do xama.png"),
        brasaoVinculado: require("@/assets/images/blazonLinked/xama.png"),
        textoVinculo: "Vinculou o Brasão de",
        nomeBrasao: "Xamã",
        descricaoBrasao: "Lance a lâmina para frente e empodere Habilidades de Seda com runas poderosas. Para trocar de Brasão, abra a tela Brasão no Menu enquanto descansa em um banco.",
        imageFooterModal: require("@/assets/images/imageFooterModal.png"),
        localizacao: require("@/assets/images/locationBlazon/Brasão do Xamã.jpg"),
    },
];