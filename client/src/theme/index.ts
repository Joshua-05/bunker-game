import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material";


export const tokens = (mode: string) => ({
    ...(mode === 'dark' ? {
        purple: {
            DEFAULT: '#7E2A9F',
            50: '#F8E4F6',
            100: '#F2CCF0',
            200: '#E29CE5',
            300: '#CB6CD8',
            400: '#AE3BCB',
            500: '#7E2A9F',
            600: '#602383',
            700: '#451B66',
            800: '#2D144A',
            900: '#190C2E'
        },
        gray: {
            DEFAULT: '#7C7C7C',
            50: '#D8D8D8',
            100: '#CECECE',
            200: '#B9B9B9',
            300: '#A5A5A5',
            400: '#909090',
            500: '#7C7C7C',
            600: '#606060',
            700: '#444444',
            800: '#282828',
            900: '#0C0C0C',
            950: '#000000'
            },
        black: {
            DEFAULT: '#000000',
            50: '#5C5C5C',
            100: '#525252',
            200: '#3D3D3D',
            300: '#292929',
            400: '#141414',
            500: '#000000',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000'
          },
        white: {
            DEFAULT: '#ffffff',
            100: '#f7f7f7'
        },
    } : {
        purple: {
            DEFAULT: '#7E2A9F',
            50: '#190C2E',
            100: '#2D144A',
            200: '#451B66',
            300: '#602383',
            400: '#7E2A9F',
            500: '#AE3BCB',
            600: '#CB6CD8',
            700: '#E29CE5',
            800: '#F2CCF0',
            900: '#F8E4F6'
        },
        gray: {
            DEFAULT: '#7C7C7C',
            50: '#000000',
            100: '#0C0C0C',
            200: '#282828',
            300: '#444444',
            400: '#606060',
            500: '#7C7C7C',
            600: '#909090',
            700: '#A5A5A5',
            800: '#B9B9B9',
            900: '#CECECE',
            950: '#D8D8D8'
            },
        black: {
            DEFAULT: '#000000',
            50: '#000000',
            100: '#000000',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#141414',
            600: '#292929',
            700: '#3D3D3D',
            800: '#525252',
            900: '#5C5C5C'
            },
        white: {
            DEFAULT: '#ffffff',
            100: '#f7f7f7'
        },
    })
})

export const themeSettings : any = (mode: string) => {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'? {
                primary: {
                    main: colors.purple[400]
                },
                secondary: {
                    main: colors.gray.DEFAULT
                },
                neutral: {
                    dark: colors.black[500],
                    light: colors.gray[50]
                }
            } : {
                primary: {
                    main: colors.gray[500]
                },
                secondary: {
                    main: colors.gray.DEFAULT
                },
                neutral: {
                    dark: colors.black[500],
                    light: colors.white[100]
                }
            })
        },
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            fontSize: 14,
            fontWeight: 500,
            h1: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 28,
                fontWeight: 600
            },
            h2: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 20,
                fontWeight: 600
            },
            h3: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 18,
                fontWeight: 600
            },
            p: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 14,
                fontWeight: 500
            },
        }
    }
}

export const ColorModeContext : any = createContext({
    toggleColorMode: () => {}
})

export const useMode = () => {
    const [mode, setMode] = useState('dark')

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
        }), []
    )

    const theme : any = useMemo(() => createTheme(themeSettings(mode)), [mode])
    return [theme, colorMode]
}

