import { Game, Move } from "../types/game";
import { PlayerType } from "../types/player";

const getLastMove = (moves: Move[]) => moves.length > 0 ? moves[moves.length - 1] : null;

const getNextPlayerFromPrevMove = (move: Move): PlayerType => move.player === 'X' ? 'O' : 'X';

export const getNextPlayer = (game: Game): PlayerType => {
    const lastMove = getLastMove(game.moves);
    return lastMove == null ? 'X' : getNextPlayerFromPrevMove(lastMove);
}

export const computeGameState = (game: Game, player: PlayerType, clickedRow: number, clickedCol: number) => {
    return game.state.map((row, rowIndex) => {
        return rowIndex === clickedRow
            ? [...row.map((col, colIndex) => colIndex === clickedCol ? player : col)]
            : row
    })
}