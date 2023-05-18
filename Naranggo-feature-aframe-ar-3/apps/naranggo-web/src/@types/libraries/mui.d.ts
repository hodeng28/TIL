// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: {
      light: string;
      default: string;
      grey200: string;
      grey: string;
      grey2: string;
      grey3: string;
      grey4: string;
      dark: string;
      blue: string;
      blue100: string;
      skyblue: string;
      yellow: string;
      green: string;
      red: string;
      orange: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      light: string;
      default: string;
      grey200: string;
      grey: string;
      grey2: string;
      grey3: string;
      grey4: string;
      dark: string;
      blue: string;
      blue100: string;
      skyblue: string;
      yellow: string;
      green: string;
      red: string;
      orange: string;
    };
  }
}

declare module '@mui/material/styles/createTypography' {
  interface Palette {
    custom: {
      light: string;
      default: string;
      grey200: string;
      grey: string;
      grey2: string;
      grey3: string;
      grey4: string;
      dark: string;
      blue: string;
      skyblue: string;
      yellow: string;
      green: string;
      red: string;
      orange: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      light: string;
      default: string;
      grey200: string;
      grey: string;
      grey2: string;
      grey3: string;
      grey4: string;
      dark: string;
      blue: string;
      skyblue: string;
      yellow: string;
      green: string;
      red: string;
      orange: string;
    };
  }
}
