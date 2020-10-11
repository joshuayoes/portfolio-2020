import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { BlogPageQuery } from "../../graphql-types";

const BlogIndex: React.FC<PageProps<BlogPageQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        if (!node.fields) throw Error("node.fields is undefined");
        if (!node.fields.slug) throw Error("node.fields.slug is undefined");
        if (!node.excerpt) throw Error("node.exceprt is undefined");

        const title = node.frontmatter?.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter?.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter?.description || node.excerpt,
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const query = graphql`
  query BlogPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
