import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Layout from "../components/Layout"
import style from './styles/blog-post.module.scss';
import { BlogPostBySlugQuery, SitePageContext } from "../../graphql-types"

const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery, SitePageContext>> = ({ data, pageContext }) => {
  const post = data?.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout className={style.layout}>
      <SEO
        title={post?.frontmatter?.title!}
        description={post?.frontmatter?.description || post?.excerpt!}
      />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {post?.frontmatter?.title!}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
        }}
      >
        {post?.frontmatter?.date!}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post?.html! }} />
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
          {previous && (
            <Link to={previous?.fields?.slug!} rel="prev">
              ← {previous?.frontmatter?.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next?.fields?.slug!} rel="next">
              {next?.frontmatter?.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
