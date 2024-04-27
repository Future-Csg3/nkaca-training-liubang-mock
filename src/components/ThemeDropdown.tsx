import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../constants/customStyles";

interface ThemeDropdownProps {
    props: {
        handleThemeChange: any;
        theme: string;
    }
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ props }) => {


    const themes = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        name: themeName,
        value: themeId,
        key: themeId,
    }))

    return (
        <Select
            placeholder={`Select Theme`}
            options={themes}
            value={themes.find((option) => option.value === props.theme)}
            styles={customStyles}
            onChange={props.handleThemeChange}
        />
    );
};

export default ThemeDropdown;