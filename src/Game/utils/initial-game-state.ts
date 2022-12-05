import { Game, TileValue } from "../types/game";

const row = Array<TileValue>(3).fill(null);
const initialState = Array<TileValue[]>(3).fill([...row]);

export const initialGameState : Game = {
    state: initialState,
    moves: [],
    winner: null
}