import { ImageBackground } from 'react-native';
import { styles } from './styles';

import bacgroundImg from '../../assets/background-galaxy.png';

interface props {
    children: React.ReactNode;
}

export function Background({ children }: props) {
    return (
        <ImageBackground
            source={bacgroundImg}
            defaultSource={bacgroundImg}
            style={styles.container}
        >
            {children}
        </ImageBackground>
    )
}