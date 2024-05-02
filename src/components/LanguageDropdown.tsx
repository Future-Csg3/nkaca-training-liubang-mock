import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from "react";
import { languageOptions } from "../constants/languageOptions";

interface LanguagesDropdownProps {
    props: {
        handleLanguageChange: any
    }
}

export interface LanguagesDropdownOption {
    id: number
    name: string
    label: string
    value: string
}

const LanguagesDropdown: React.FC<LanguagesDropdownProps> = ({ props }) => {

    const defaultLanguage = languageOptions[0]

    const onChange = (e: any) => {
        props.handleLanguageChange(e.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel  id="language-dd-select-label">Lanugage</InputLabel>
                <Select
                    labelId="language-dd-select-label"
                    defaultValue={defaultLanguage}
                    label="Lanugage"
                    onChange={(e) => { onChange(e) }}
                >
                    {languageOptions.map(e =>
                        <MenuItem key={e.id} value={e as any} >{e.label}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box >
    );
};

export default LanguagesDropdown;