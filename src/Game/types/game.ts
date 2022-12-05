import { PlayerType } from "./player"
import { Winner } from "./winner";

export type TileValue = PlayerType | null;

export type Position = [row: number, col: number];

export type Move = {
    player: PlayerType,
    position: Position
}

export type GameState = TileValue[][]

export type Game = {
    state: GameState,
    moves: Move[],
    winner: Winner | null
}
