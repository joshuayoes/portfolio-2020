import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { HomePageQuery } from "../../graphql-types";
import BackgroundImage, { IFluidObject } from "gatsby-background-image";
import style from "./styles/index.module.scss";
import Layout from "../components/Layout";
import { scale } from "../utils/typography";
import Typewriter from "typewriter-effect";
import { FluidObject } from "gatsby-image";
import ProjectCard from "../components/ProjectCard";
import useScrollPosition from "@react-hook/window-scroll"
import cn from "classnames";
import SEO from "../components/seo";

const HomePage: React.FC<PageProps<HomePageQuery>> = ({ data }) => {
  const hero = data?.hero?.childImageSharp?.fluid;
  const projects = data?.projects?.edges;
  const blogPosts = data?.blogPosts?.edges;

  const scrollY = useScrollPosition(60)
  const isTop = scrollY === 0;

  return (
    <Layout className={cn(style.layout, { [style.top]: isTop })}>
      <SEO title="Home" />
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
            {projects.map(({ node: { fields, frontmatter } }) => (
              <ProjectCard
                key={frontmatter?.title! + fields?.slug}
                alt={frontmatter?.title!}
                to={fields?.slug!}
                name={frontmatter?.title!}
                type={frontmatter?.category!}
                fluid={frontmatter?.thumbnail?.childImageSharp
                  ?.fluid as FluidObject}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={style.blog}>
        <div>
          <h3>02</h3>
          <h1>My Articles</h1>
          <ul>
          {blogPosts.map((
              { node: { excerpt, fields, frontmatter } },
            ) => (
              <li key={frontmatter?.title! + fields?.slug}>
                <label />
                <div>
                  <h5>{frontmatter?.date}</h5>
                  <h3>
                    <Link to={fields?.slug ?? "/"}>
                      {frontmatter?.title}
                    </Link>
                  </h3>
                  <p>{excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query HomePage {
    hero: file(relativePath: {eq: "home-background.jpg"}) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    projects: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/projects/"}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            category
            thumbnail {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    blogPosts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/blog/"}}, limit: 5) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
