import Grid from '@mui/material/Grid'; import { useState } from 'react';
import { initialGameState } from './utils/initial-game-state';
import { Typography } from '@mui/material';
import { checkForWinner } from './utils/winner.utils';
import { computeGameState, getNextPlayer } from './utils/game.utils';
import { Move, Position, TileValue } from './types/game';
import Board from './Board';

export default function GamePage() {
    const [game, setGame] = useState(initialGameState);
    const nextPlayer = getNextPlayer(game);

    const onMove = (val: TileValue, [clickedRow, clickedCol]: Position) => {
        if (val != null || game.winner != null) {
            return;
        }

        setGame(currentGame => {
            const newGameState = computeGameState(currentGame, nextPlayer, clickedRow, clickedCol);
            const newMove: Move = {
                player: nextPlayer,
                position: [clickedRow, clickedCol]
            };

            return {
                state: newGameState,
                moves: [...currentGame.moves, newMove],
                winner: checkForWinner(newGameState)
            };
        });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
                <Typography variant='h4' mt={3} mb={6} align='center'>A Game of Tic Tac Toe!</Typography>

                <Board game={game} onMove={onMove}></Board>

                <Typography variant='h5' align='center' mt={4}>
                    {game.winner != null ? `Winner: ${game.winner.player}` : `Next move: ${nextPlayer}`}
                </Typography>

                <button type="button" onClick={() => console.log({ moves: game.moves, winner: game.winner })}>Print</button>

            </Grid>
        </Grid>
    );
}
