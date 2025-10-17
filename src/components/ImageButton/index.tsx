
import { Image, ImageProps, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ImageButtonProps = TouchableOpacityProps & {
    imageSource: ImageSourcePropType
    imageProps?: Omit<ImageProps, "source"> 
}

export function ImagemButton({imageSource, imageProps, ...rest}: ImageButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} {...rest}>
            <Image
                source={imageSource}
                {...imageProps} 
            />
        </TouchableOpacity>
    )
}