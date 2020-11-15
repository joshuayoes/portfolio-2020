/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SeoQuery } from "../../graphql-types"

interface Props {
  description?: string
  lang?: string
  meta?: []
  title: string
  template?: boolean;
  thumbnail?: string;
  type?: string;
}

const SEO = ({ description, lang, meta, title, thumbnail, type, template = true }: Props) => {
  const { site } = useStaticQuery<SeoQuery>(
    graphql`
      query SEO {
        site {
          siteMetadata {
            title
            description
            author
            thumbnail
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description!
  const previewThumbnail = thumbnail || `${site?.siteMetadata?.siteUrl}/${site?.siteMetadata?.thumbnail}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={template ? `%s | ${site?.siteMetadata?.title}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: previewThumbnail,
        },
        {
          property: `og:image:secure_url`,
          content: previewThumbnail,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type ?? `website`,
        },
        {
          name: `twitter:card`,
          content: thumbnail ? `summary_large_image` : `summary`
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.social?.twitter!,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  )
}

export default SEO
