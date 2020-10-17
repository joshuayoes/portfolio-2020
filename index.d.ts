declare module "typewriter-effect";
declare module "typography-theme-twin-peaks" {
  import { TypographyOptions } from "typography";
  const TwinPeaks: TypographyOptions;
  export default TwinPeaks;
}

declare module "*.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "classnames" {
  import { ClassNamesExport } from "classnames/types";
  const cn: ClassNamesExport;
  export default cn;
}

declare module "gatsby-plugin-transition-link/AniLink" {
  import { GatsbyLinkProps } from "gatsby";

  interface Props extends GatsbyLinkProps<any> {
    paintDrip?: boolean;
    fade?: boolean;
    swipe?: boolean;
    cover?: boolean;
    duration?: number;
    entryOffset?: number;
    direction?: string;
    top?: string;
    color?: string;
    hex?: string;
    bg?: string;
  }
  const AniLink: React.FC<Props>;
  export default AniLink;
}
