import { Game, Position } from "./types/game";
import './WinnerIndicator.css';

type WinnerIndicatorProps = {
    game: Game
}

enum WinnerKeys { ROW_1, ROW_2, ROW_3, COL_1, COL_2, COL_3, CROSS_TOP_LEFT_TO_BOTTOM_RIGHT, CROSS_BOTTOM_LEFT_TO_TOP_RIGHT }

type SvgLinePoints = {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

const linePointsMap: { [posVal in WinnerKeys]: SvgLinePoints } = {
    [WinnerKeys.ROW_1]: { x1: 0, y1: 15, x2: 90, y2: 15 },
    [WinnerKeys.ROW_2]: { x1: 0, y1: 45, x2: 90, y2: 45 },
    [WinnerKeys.ROW_3]: { x1: 0, y1: 75, x2: 90, y2: 75 },
    [WinnerKeys.COL_1]: { x1: 15, y1: 0, x2: 15, y2: 90 },
    [WinnerKeys.COL_2]: { x1: 45, y1: 0, x2: 45, y2: 90 },
    [WinnerKeys.COL_3]: { x1: 75, y1: 0, x2: 75, y2: 90 },
    [WinnerKeys.CROSS_TOP_LEFT_TO_BOTTOM_RIGHT]: { x1: 0, y1: 0, x2: 90, y2: 90 },
    [WinnerKeys.CROSS_BOTTOM_LEFT_TO_TOP_RIGHT]: { x1: 90, y1: 0, x2: 0, y2: 90 },
}

function getWinnerKeyFromPositions(positions: Position[]): WinnerKeys {
    const [startRow, startCol] = positions[0];
    const [endRow, endCol] = positions[positions.length - 1];

    // Row winner
    if (startRow === endRow) {
        const rowKeysInOrder = [WinnerKeys.ROW_1, WinnerKeys.ROW_2, WinnerKeys.ROW_3];
        return rowKeysInOrder[startRow];
    }
    // Column winner
    else if (startCol === endCol)
    {
        const columnKeysInOrder = [WinnerKeys.COL_1, WinnerKeys.COL_2, WinnerKeys.COL_3];
        return columnKeysInOrder[startCol];
    }
    // Cross winner
    else
    {
        return startCol === 0
            ? WinnerKeys.CROSS_TOP_LEFT_TO_BOTTOM_RIGHT
            : WinnerKeys.CROSS_BOTTOM_LEFT_TO_TOP_RIGHT;
    }
}

export default function WinnerIndicator({ game }: WinnerIndicatorProps) {
    const { winner } = game;

    if (winner != null) {
        const winnerKey = getWinnerKeyFromPositions(winner!.positions);
        const winnerLinePoints = linePointsMap[winnerKey];

        return (
            <svg className="strike-through" viewBox={`0 0 90 90`} xmlns="http://www.w3.org/2000/svg">
                <line stroke="#ccc" strokeWidth={1} {...winnerLinePoints} />
            </svg>
        );
    }

    return (null);
}
