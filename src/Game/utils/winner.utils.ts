import { GameState, Position, TileValue } from '../types/game';
import { PlayerType } from '../types/player';
import { Winner } from '../types/winner';

const allPossibleWinningPositions: Position[][] = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Crosses
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]],
];

const mapPositionToTile = (state: GameState, [row, col]: Position) => state[row][col];

const hasWinner = (arr: TileValue[]) => arr.every(c => c === 'X') || arr.every(c => c === 'O');

export function checkForWinner(gameState: GameState): Winner | null {
    const winningPositions = allPossibleWinningPositions
        .find(positions => {
            const tileValues = positions
                .map(pos => mapPositionToTile(gameState, pos));
            
            return hasWinner(tileValues);
        });

    if (winningPositions != null) {
        return {
            player: mapPositionToTile(gameState, winningPositions[0]) as PlayerType,
            positions: winningPositions
        };
    }

    return null;
}
