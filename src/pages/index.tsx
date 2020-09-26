import React from "react"
import { graphql, PageProps } from "gatsby"
import { HomePageQuery } from "../../graphql-types"
import BackgroundImage from "gatsby-background-image"
import style from "./styles/index.module.scss"

const HomePage: React.FC<PageProps<HomePageQuery>> = ({ data }) => {
  const hero = data?.hero?.childImageSharp?.fluid

  return (
    <main>
      <BackgroundImage Tag="section" fluid={hero as any} className={style.hero}>
        <h1>Joshua Yoes</h1>
        <h4>Javascript Developer</h4>
      </BackgroundImage>
    </main>
  )
}

export default HomePage

export const query = graphql`
  query HomePage {
    hero: file(relativePath: { eq: "home-background.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
