import { Text, TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { GameCardProps } from '../../@types/navigation';

interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
                <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.ads}>
                        {data._count.ads}
                        {data._count.ads === 1 ? ' anúncio' : ' anúncios'}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}