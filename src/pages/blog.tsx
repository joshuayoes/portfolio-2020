import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import { BlogPageQuery } from "../../graphql-types";
import style from './styles/blog.module.scss';

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
                    <Link to={fields?.slug!}>
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
          }
        }
      }
    }
  }
`;
