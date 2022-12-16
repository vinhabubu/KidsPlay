import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

/**
 * https://callstack.github.io/react-native-paper/theming.html
 **/
export const defaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#1C0056',
    accent: '#D0021B',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    placeholder: '#393939',
    backdrop: '#11111150',
    onSurface: '#1C0056',
    text: '#000000',
    error: '#FF0000',
    default: '#fff176',
    headbar: '#006400',
    //Define new color
  },
};

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};
