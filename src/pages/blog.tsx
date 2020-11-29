import React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import { BlogPageQuery } from "../../graphql-types";
import style from './styles/blog.module.scss';
import AniLink from "gatsby-plugin-transition-link/AniLink";

const BlogIndex: React.FC<PageProps<BlogPageQuery>> = ({ data }) => {
  const blogPosts = data?.blogPosts?.edges;

  return (
    <Layout className={style.layout}>
      <SEO title="All posts" />
      <section className={style.blog}>
        <div>
          <ul>
            {blogPosts.map((
              { node: { excerpt, fields, frontmatter } },
            ) => (
              <li key={frontmatter?.title! + fields?.slug}>
                <label />
                <div>
                  <h5>{frontmatter?.date}</h5>
                  <h3>
                    <AniLink to={`/blog${fields?.slug!}`} paintDrip hex={style.primary}>
                      {frontmatter?.title}
                    </AniLink>
                  </h3>
                  <p>{frontmatter?.description ?? excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
    blogPosts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/blog/"}}) {
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
