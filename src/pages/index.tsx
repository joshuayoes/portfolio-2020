import React from "react"
import { graphql, PageProps } from "gatsby"
import { HomePageQuery } from "../../graphql-types"
import BackgroundImage, { IFluidObject } from "gatsby-background-image"
import style from "./styles/index.module.scss"
import HomeLayout from "../components/HomeLayout"
import { scale } from "../utils/typography"
import Typewriter from "typewriter-effect"

const HomePage: React.FC<PageProps<HomePageQuery>> = ({ data }) => {
  const hero = data?.hero?.childImageSharp?.fluid

  return (
    <HomeLayout>
      <BackgroundImage<"section">
        Tag="section"
        fluid={hero as IFluidObject}
        className={style.hero}
      >
        <h1 style={scale(7 / 5)}>Joshua Yoes</h1>
        <h3>
          <Typewriter
            options={{
              strings: [
                "Javascript Developer",
                "React Developer",
                "Typescript Developer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h3>
      </BackgroundImage>
    </HomeLayout>
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
