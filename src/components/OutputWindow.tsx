import React from "react";

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface OutputWindowProps {
    props: {
        outputDetails: OutputDetails | null
    }
}

export interface OutputDetails {
    result: string,
    isCompileError: boolean,
    isUnsuccess: boolean

}

const OutputWindow: React.FC<OutputWindowProps> = ({ props }) => {
    const getOutput = () => {
        if (props.outputDetails!.isCompileError || props.outputDetails!.isUnsuccess) {
            return (
                <Typography variant="subtitle2" gutterBottom color="red">
                    {props.outputDetails?.result}
                </Typography>
            );
        } else {
            return (
                <Typography variant="subtitle2" gutterBottom color="green">
                    {props.outputDetails?.result}
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