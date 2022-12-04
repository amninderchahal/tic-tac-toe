import { Position } from "./game"
import { PlayerType } from "./player"

export type Winner = {
    player: PlayerType,
    positions: Position[]
}