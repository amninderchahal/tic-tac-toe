import { default as MUIAppBar } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function AppBar() {
    return (
        <MUIAppBar position="static">
            <Toolbar>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Tic Tac Toe
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </MUIAppBar>
    );
}