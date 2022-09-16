import { useState, useEffect } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import { GameCardProps } from '../../@types/navigation';
import { Background } from '../../components/Background';

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([])

    useEffect(() => {
        fetch('http://192.168.2.103:3333/games')
            .then(res => res.json())
            .then(data => setGames(data))
    }, [])


    // Fazendo a navegação para aba game
    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo} />

                <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja Jogar...' />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard data={item} onPress={() => handleOpenGame(item)} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>

    )
}