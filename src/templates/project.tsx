import React from "react";
import { graphql, PageProps } from "gatsby";

import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { ProjectBySlugQuery, SitePageContext } from "../../graphql-types";
import style from './styles/project.module.scss';
import Layout from "../components/Layout";
import Image, { FluidObject } from "gatsby-image";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { BiLink } from 'react-icons/bi';

const ProjectTemplate: React.FC<
  PageProps<
    ProjectBySlugQuery,
    SitePageContext
  >
> = ({ data, pageContext }) => {
  const project = data.markdownRemark;
  const { previous, next } = pageContext;

  const nextSlug = next?.fields?.slug;
  const nextTitle = next?.frontmatter?.title;
  const previousSlug = previous?.fields?.slug;
  const previousTitle = previous?.frontmatter?.title;
  const objectPosition = project?.frontmatter?.objectPosition ?? 'center center';

  if (!project?.frontmatter?.title) {
    throw Error("post.frontmatter.title is undefined");
  }
  if (!project?.excerpt) throw Error("post.excerpt is undefined");
  if (!project?.html) throw Error("post.html is undefined");

  return (
    <Layout className={style.layout}>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
      />
      <Image className={style.image} fluid={project.frontmatter.thumbnail?.childImageSharp?.fluid as FluidObject} imgStyle={{ objectPosition }} />
      <article>
        <h1
          style={{
            marginTop: rhythm(1),
          }}
        >
          {project.frontmatter.title}
        </h1>
        {project.frontmatter?.project_link && <h4
          style={{ marginTop: rhythm(1 / 2), marginBottom: rhythm(1 / 2) }}>
            <a href={project.frontmatter.project_link}>
            <BiLink size={30} />
            View Project
            </a>
        </h4>}
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
        >
          <li>
            {previousSlug && (
              <AniLink to={previousSlug} rel="prev" cover bg={style.primary} direction="left">
                ← {previousTitle}
              </AniLink>
            )}
          </li>
          <li>
            {nextSlug && nextTitle && (
              <AniLink to={nextSlug} rel="next" cover bg={style.primary} direction="right">
                {nextTitle} →
              </AniLink>
            )}
          </li>
        </ul>
      </article>
    </Layout>
  );
};

export default ProjectTemplate;
 
export const query = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        project_link
        objectPosition
        thumbnail {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
