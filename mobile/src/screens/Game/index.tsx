import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatchModal } from '../../components/DuoMatchModal';


export function Game() {
    const [ads, setAds] = useState<DuoCardProps[]>([])
    const [duoSelected, setDuoSelected] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsID: string) {
        fetch(`http://192.168.2.103:3333/ads/${adsID}/discord`)
            .then(res => res.json())
            .then(data => setDuoSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.2.103:3333/games/${game.id}/ads`)
            .then(res => res.json())
            .then(data => setAds(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>

                    <Image source={logoImg} />

                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} />

                <Heading title={game.title} subtitle={'Conecte-se e comece a jogar!'} />

                <FlatList
                    data={ads}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => {
                                getDiscordUser(item.id);
                            }}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não há anúncios publicados para este jogo.</Text>
                    )}
                />

                <DuoMatchModal
                    visible={duoSelected.length > 0}
                    discord={duoSelected}
                    onClose={() => setDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    )
}