import Typography from "typography";
import TwinPeaks from "typography-theme-twin-peaks";
import theme from "../utils/_variables.scss";

// Polyfill for 'typography-breakpoint-constants'
const MOBILE_MEDIA_QUERY = "@media only screen and (max-width:480px)";

const underline = (color: string) =>
  "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, " +
  color +
  " 1px, " + color + " 2px, rgba(0, 0, 0, 0) 2px)";

TwinPeaks.overrideThemeStyles = ({ rhythm }) => ({
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
  blockquote: {
    borderLeft: `${rhythm(3 / 16)} solid ${theme.dark}`,
  },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: {
      borderLeft: `${rhythm(3 / 16)} solid ${theme.dark}`,
    },
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
