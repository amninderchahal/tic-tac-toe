import Grid from '@mui/material/Grid';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        import { useState } from 'react';
import { initialGameState } from './utils/initial-game-state';
import { TileValue } from './types/game';
import Button from '@mui/material/Button';
import './GamePage.css';
import { checkForWinner } from './utils/winner.utils';
import WinnerIndicator from './WinnerIndicator';
import { computeGameState, getNextPlayer } from './utils/game.utils';
import { Typography } from '@mui/material';

const TILE_SIZE = 80;

export default function GamePage() {
    const [game, setGame] = useState(initialGameState);
    const nextPlayer = getNextPlayer(game);

    const onClick = (val: TileValue, clickedRow: number, clickedCol: number) => setGame(currentGame => {
        if (val != null || game.winner != null) {
            return currentGame;
        }

        const newGameState = computeGameState(currentGame, nextPlayer, clickedRow, clickedCol);

        return {
            state: newGameState,
            moves: currentGame.moves.concat({
                player: nextPlayer,
                position: [clickedRow, clickedCol]
            }),
            winner: checkForWinner(newGameState)
        };
    });

    const renderGameTile = (val: TileValue, row: number, col: number) => (
        <span className='tile' key={row + col}>
            <Button sx={{ width: TILE_SIZE, height: TILE_SIZE, minWidth: TILE_SIZE, padding: 1 }}
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
                <Typography variant='h4' mt={3} mb={6} align='center'>A Game of Tic Tac Toe!</Typography>

                <div className='game-wrapper'>
                    <WinnerIndicator game={game} />
                    <div className='tile-wrapper'>
                        {game.state.map(renderGameRow)}
                    </div>
                </div>

                <Typography variant='h5' align='center' mt={4}>
                    { game.winner != null ? `Winner: ${game.winner.player}` : `Next move: ${nextPlayer}` }
                </Typography>
            </Grid>
        </Grid>
    );
}
