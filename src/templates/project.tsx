import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { ProjectBySlugQuery, SitePageContext } from "../../graphql-types";

const ProjectTemplate: React.FC<
  PageProps<
    ProjectBySlugQuery,
    SitePageContext
  >
> = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  const nextSlug = next?.fields?.slug;
  const nextTitle = next?.frontmatter?.title;
  const previousSlug = previous?.fields?.slug;
  const previousTitle = previous?.frontmatter?.title;

  if (!post?.frontmatter?.title) {
    throw Error("post.frontmatter.title is undefined");
  }
  if (!post?.excerpt) throw Error("post.exceprt is undefined");
  if (!post?.html) throw Error("post.html is undefined");

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {post.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
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
      }
    }
  }
`;
