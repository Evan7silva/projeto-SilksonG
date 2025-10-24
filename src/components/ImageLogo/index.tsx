import { Image, View } from "react-native";

export function ImageLogo() {

    const imageLogo = require("@/assets/images/silksong_logo_white-fs8.png")
    return (
        <View>
            <Image style={{width: "auto", height: 200, marginTop: 20}} source={imageLogo}/>
        </View>
    )
}
