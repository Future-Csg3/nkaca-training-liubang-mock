import React, { useState } from "react";

import { Button, TextField } from '@mui/material';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const ExampleCounter: React.FC = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    };



    return (
        <Container>
            <Card>
                <Item>
                    {count}
                </Item>
                <Button variant="contained" color="primary" fullWidth onClick={() => increment()}>
                    Count Up!
                </Button>
            </Card>
        </Container>
    );
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
});

const Card = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});
export default ExampleCounter;