import React from "react";

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface OutputWindowProps {
    props: {
        outputDetails: any
    }
}

const OutputWindow: React.FC<OutputWindowProps> = ({ props }) => {
    const getOutput = () => {
        let statusId = props.outputDetails?.status?.id;

        if (statusId === 6) {
            // Compile error
            return (
                <Typography variant="subtitle2" gutterBottom color="red">
                    {atob(props.outputDetails?.compile_output)}
                </Typography>
            );
        } else if (statusId === 3) {
            return (
                <Typography variant="subtitle2" gutterBottom color="green">
                    {atob(props.outputDetails.stdout) !== null
                        ? `${atob(props.outputDetails.stdout)}`
                        : null}
                </Typography>
            );
        } else if (statusId === 5) {
            return (
                <Typography variant="subtitle2" gutterBottom color="red">
                    {`Time Limit Exceeded`}
                </Typography>
            );
        } else {
            return (
                <Typography variant="subtitle2" gutterBottom color="red">
                    {atob(props.outputDetails?.stderr)}
                </Typography>
            );
        }
    };
    return (
        <>
            <Box sx={{ width: '100%', whiteSpace: "pre-wrap" }}>
                <Typography variant="h5" gutterBottom>
                    Result
                </Typography>
                <Window style={{ overflow: "auto" }}>
                    {props.outputDetails ? <>{getOutput()}</> : null}
                </Window>
            </Box>
        </>
    );
};

const Window = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    backgroundColor: "#1e293b",
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 300,
    borderRadius: "7px",
    lineHeight: '60px',
}));

export default OutputWindow;