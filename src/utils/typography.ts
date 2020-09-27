import Typography, { TypographyOptions } from "typography";
import TwinPeaks from "typography-theme-twin-peaks";
import theme from "../utils/_variables.scss";

const underline = (color: string) =>
  "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, " +
  color +
  " 1px, " + color + " 2px, rgba(0, 0, 0, 0) 2px)";

TwinPeaks.overrideThemeStyles = () => ({
  a: {
    color: theme.dark,
    backgroundImage: underline(theme.dark),
    transition: "all 0.4s ease-in-out",
    textShadow: "none",
  },
  "a:hover,a:active": {
    color: theme.primary,
    backgroundImage: underline(theme.primary),
  },
});

const typography = new Typography(TwinPeaks);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
