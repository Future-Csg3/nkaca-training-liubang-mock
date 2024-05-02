import React from "react";

import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface ChapterCreateFormProp {
    props: {
        chapterId: string,
        handleChapterIdChange: any;
        leve: number,
        handleLevelChange: any;
        setFormError: any
    }
}

const ChapterCreateForm: React.FC<ChapterCreateFormProp> = ({ props }) => {

    const [hasError, setHasError] = React.useState(false)

    const onChapterIdChange = (e: any) => {
        props.handleChapterIdChange(e.target.value)
        chapterIdVaid(e.target.value)
    }

    const chapterIdrRegex = /^[A-Z0-9\-]*$/;
    const chapterIdVaid = (e: string) => {
        const isError = !chapterIdrRegex.test(e)
        setHasError(isError)
        props.setFormError(isError)
    }

    const onLevelChange = (e: any) => {
        props.handleLevelChange(e.target.value)
    }

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <Stack direction="row" spacing={5}>
                    <FormControl>
                        <TextField
                            type="text"
                            label="Chapter ID"
                            required
                            value={props.chapterId}
                            error={hasError}
                            onChange={onChapterIdChange}
                            helperText={hasError ? 'A~Z,-,0~9が使えます' : 'format:CHAPTER-XX-XXX'}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="level-dd-select-label">Level</InputLabel>
                        <Select
                            labelId="level-dd-select-label"
                            defaultValue={props.leve}
                            label="Level"
                            onChange={onLevelChange}
                        >
                            <MenuItem key="1" value={1} > level 1          </MenuItem>
                            <MenuItem key="2" value={2} >level 2           </MenuItem>
                            <MenuItem key="3" value={3} >level 3           </MenuItem>
                            <MenuItem key="4" value={4} >level 4           </MenuItem>
                            <MenuItem key="5" value={5} >level 5           </MenuItem>
                            <MenuItem key="6" value={6} >level 6           </MenuItem>
                            <MenuItem key="7" value={7} >level 7           </MenuItem>
                            <MenuItem key="8" value={8} >level 8           </MenuItem>
                            <MenuItem key="9" value={9} >level 9           </MenuItem>
                            <MenuItem key="10" value={10} >level 10        </MenuItem>
                        </Select>

                    </FormControl>
                </Stack>
            </Box >
        </>
    )

}

export default ChapterCreateForm