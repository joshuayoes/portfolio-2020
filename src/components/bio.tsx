import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image, { FixedObject } from "gatsby-image"

import { rhythm } from "../utils/typography"
import { BioQueryQuery } from "../../graphql-types"

const Bio: React.FC = () => {
  const data = useStaticQuery<BioQueryQuery>(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const author = data?.site?.siteMetadata?.author!;
  const social = data?.site?.siteMetadata?.social!;

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data?.avatar?.childImageSharp?.fixed as FixedObject}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        <strong>{author}</strong> is a Javascript developer that is passionate
        about Typescript, empowering developers, and test driven development.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          I also tweet about SW Washington politics and Nintendo games.
        </a>
      </p>
    </div>
  )
}

export default Bio
