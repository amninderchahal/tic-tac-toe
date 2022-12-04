import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { initialGameState } from './initial-game-state';
import { Move, TileValue } from './types/game';
import Button from '@mui/material/Button';
import { PlayerType } from './types/player';
import './GamePage.css';
import { checkForWinner } from './utils/winner.utils';
import { Winner } from './types/winner';

export default function GamePage() {
    const [game, setGame] = useState(initialGameState);
    const [winner, setWinner] = useState<Winner | null>(null);

    useEffect(() => {
        setWinner(checkForWinner(game))
    }, [game]);

    const getPlayerFromPrevMove = (move: Move): PlayerType => move.player === 'X' ? 'O' : 'X';

    const onClick = (val: TileValue, row: number, col: number) => setGame(currentGame => {
        if (val != null || winner != null) {
            return currentGame;
        }

        const lastMove = currentGame.moves.length > 0 ? currentGame.moves[currentGame.moves.length - 1] : null;

        const player = lastMove == null ? 'X' : getPlayerFromPrevMove(lastMove);

        return {
            state: currentGame.state.map((r, i) => {
                return i === row
                    ? [...r.map((c, j) => j === col ? player : c)]
                    : r
            }),
            moves: [
                ...currentGame.moves,
                { player, position: [row, col] }
            ]
        };
    });

    const renderGameTile = (val: TileValue, row: number, col: number) => (
        <span className='tile' key={row + col}>
            <Button sx={{ width: 60, height: 60 }}
                variant="text" onClick={() => onClick(val, row, col)}>
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
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
                <h1 className="text-3xl">
                    A Game of Tic Tac Toe!
                </h1>

                { winner != null ? (<div>Winner: {winner.player}</div>) : '' }

                <div className='tile-wrapper'>
                    {game.state.map(renderGameRow)}
                </div>
            </Grid>
        </Grid>
    )
}
