import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemePropType = {
    children:JSX.Element;
}

export enum themePalette {
    BG = '#121212',
    DB = '#3700b3',
    PM = '#bb86fc'
}

const theme = createTheme({
    palette: {
        mode:"dark",
        background:{
            default:themePalette.BG
        },
        primary:{
            main: themePalette.DB,
        },
        secondary:{
            main: themePalette.PM
        }
    },
})

export const ThemeConfig:React.FC<ThemePropType> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}