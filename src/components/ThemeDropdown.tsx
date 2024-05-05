import monacoThemes from "monaco-themes/themes/themelist.json";
import React from "react";


import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface ThemeDropdownProps {
    props: {
        handleThemeChange: any;
        theme: string;
    }
}

export interface ThemeDropdownOption {
    key: string
    name: string
    label: string
    value: string
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ props }) => {


    const themes = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        name: themeName,
        value: themeId,
        key: themeId,
    }))

    const defaultTheme = themes.find((option) => option.value === "cobalt")

    const onChange = (e: any) => {
        props.handleThemeChange(e.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="theme-dd-select-label">Theme</InputLabel>
                <Select
                    labelId="theme-dd-select-label"
                    defaultValue={defaultTheme?.value}
                    label="Theme"
                    onChange={(e) => { onChange(e) }}
                >
                    {themes.map(e =>
                        <MenuItem key={e.key} value={e.value} >{e.label}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box >
    );
};

export default ThemeDropdown;