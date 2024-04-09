type RawCard = {
    slug: string
    image?: string
}

type CardType = RawCard & {
    revealed: boolean
    resolved: boolean
}

type RawGame = {
    slug: string
    board: string[]
    resolvedCards: RawCard[]
}

type GameType = {
    board: string[]
}

export type {RawGame, GameType, RawCard, CardType}