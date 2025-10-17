
import { Image, ImageProps, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ImageButtonProps = TouchableOpacityProps & {
    source: ImageSourcePropType
    imageProps?: Omit<ImageProps, "source"> 
}

export function ImagemButton({source, imageProps, ...rest}: ImageButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} {...rest}>
            <Image
                source={source}
                {...imageProps} 
            />
        </TouchableOpacity>
    )
}