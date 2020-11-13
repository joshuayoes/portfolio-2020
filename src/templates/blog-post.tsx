import React from "react"
import { graphql, PageProps } from "gatsby"

import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Layout from "../components/Layout"
import style from './styles/blog-post.module.scss';
import { BlogPostBySlugQuery, SitePageContext } from "../../graphql-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery, SitePageContext>> = ({ data, pageContext }) => {
  const post = data?.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout className={style.layout}>
      <SEO
        title={post?.frontmatter?.title!}
        description={post?.frontmatter?.description || post?.excerpt!}
      />
      <article>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: 0,
          }}
        >
          {post?.frontmatter?.date!}
        </p>
        <h1
          style={{
            marginTop: rhythm(1 / 5),
          }}
        >
          {post?.frontmatter?.title!}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post?.html! }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

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
              <AniLink to={previous?.fields?.slug!} rel="prev" cover bg={style.primary} direction="left">
                ← {previous?.frontmatter?.title}
              </AniLink>
            )}
          </li>
          <li>
            {next && (
              <AniLink to={next?.fields?.slug!} rel="next" cover bg={style.primary} direction="right">
                {next?.frontmatter?.title} →
              </AniLink>
            )}
          </li>
        </ul>
      </article>
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
