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

declare module "*.svg" {
  const SVG: string;
  export default SVG;
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

declare module "gatsby-plugin-mailchimp" {
  interface MailchimpResponse {
    result: "success" | "error";
    /** a user-friendly message indicating details of your submissions (usually something like "thanks for subscribing!" or "this email has already been added") */
    msg: string;
  }

  type MailChimpFields<CustomFields = {}> = {
    FNAME?: string;
    LNAME?: string;
    ADDRESS?: string;
    PHONE?: string;
    BIRTHDAY?: string;
  } & CustomFields;

  export default function addToMailchimp<CustomFields = {}>(
    email: string,
    fields?: MailChimpFields<CustomFields>,
  ): Promise<MailchimpResponse>;
}
