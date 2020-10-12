import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { ProjectBySlugQuery, SitePageContext } from "../../graphql-types";
import style from './styles/project.module.scss';
import Layout from "../components/Layout";
import Image, { FluidObject } from "gatsby-image";

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

  if (!project?.frontmatter?.title) {
    throw Error("post.frontmatter.title is undefined");
  }
  if (!project?.excerpt) throw Error("post.exceprt is undefined");
  if (!project?.html) throw Error("post.html is undefined");

  return (
    <Layout className={style.layout}>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
      />
      <Image className={style.image} fluid={project.frontmatter.thumbnail?.childImageSharp?.fluid as FluidObject} />
      <article>
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        >
          {project.frontmatter.title}
        </h1>
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
              <Link to={previousSlug} rel="prev">
                ← {previousTitle}
              </Link>
            )}
          </li>
          <li>
            {nextSlug && nextTitle && (
              <Link to={nextSlug} rel="next">
                {nextTitle} →
              </Link>
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
