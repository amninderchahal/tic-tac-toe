
import WinnerIndicator from './WinnerIndicator';
import Button from '@mui/material/Button';
import { Game, Position, TileValue } from './types/game';
import './Board.css';

type BoardProps = {
    game: Game,
    onMove: (val: TileValue, movePos: Position) => void
};

const TILE_SIZE = 80;

export default function Board({ game, onMove }: BoardProps) {
    const renderGameTile = (val: TileValue, row: number, col: number) => (
        <span className='tile' key={`${row}-${col}`}>
            <Button sx={{ width: TILE_SIZE, height: TILE_SIZE, minWidth: TILE_SIZE, padding: 1 }}
                variant="text" onClick={() => onMove(val, [row, col])}>
                {val ?? ''}
            </Button>
        </span>
    );

    const renderGameRow = (row: TileValue[], i: number) => (
        <div className='tile-row' key={i}>
            {row.map((col, j) => renderGameTile(col, i, j))}
        </div>
    );

    return (
        <div className='game-wrapper'>
            <WinnerIndicator game={game} />
            <div className='tile-wrapper'>
                {game.state.map(renderGameRow)}
            </div>
        </div>
    );
}