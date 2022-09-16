export interface GameCardProps {
    id: string;
    title: string;
    _count: {
        ads: number
    };
    bannerUrl: string;
}

export interface GameParams {
    id: string;
    title: string;
    bannerUrl: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            game: GameParams;
        }
    }
}