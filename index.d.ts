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
