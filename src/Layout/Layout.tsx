import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import AppBar from './AppBar';

export default function Layout(props: PropsWithChildren) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar></AppBar>
            { props.children }
        </Box>
    );
}