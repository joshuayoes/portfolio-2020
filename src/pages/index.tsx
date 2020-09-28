import React from "react"
import { graphql, PageProps } from "gatsby"
import { HomePageQuery } from "../../graphql-types"
import BackgroundImage, { IFluidObject } from "gatsby-background-image"
import style from "./styles/index.module.scss"
import HomeLayout from "../components/HomeLayout"
import { scale } from "../utils/typography"
import Typewriter from "typewriter-effect"
import { FluidObject } from "gatsby-image"
import ProjectCard from "../components/ProjectCard"

const HomePage: React.FC<PageProps<HomePageQuery>> = ({ data }) => {
  const hero = data?.hero?.childImageSharp?.fluid
  const projects = data?.allMarkdownRemark?.edges

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
      <section className={style.projects}>
        <div>
          <h3>01</h3>
          <h1>My Projects</h1>
          <div>
            {projects.map(({ node }) => (
              <ProjectCard
                key={node.fields?.slug}
                alt={node.frontmatter?.title!}
                to={node.fields?.slug!}
                name={node.frontmatter?.title!}
                type={node.frontmatter?.category!}
                fluid={
                  node.frontmatter?.thumbnail?.childImageSharp
                    ?.fluid as FluidObject
                }
              />
            ))}
          </div>
        </div>
      </section>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            thumbnail {
              childImageSharp {
                fluid(quality: 90, maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
