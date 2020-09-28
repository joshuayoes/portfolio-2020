import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { ProjectBySlugQuery, SitePageContext } from "../../graphql-types"

const ProjectTemplate: React.FC<PageProps<
  ProjectBySlugQuery,
  SitePageContext
>> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  if (!post?.frontmatter?.title)
    throw Error("post.frontmatter.title is undefined")
  if (!post?.excerpt) throw Error("post.exceprt is undefined")
  if (!post?.html) throw Error("post.html is undefined")
  if (!next?.fields?.slug) throw Error(`next.fields.slug is undefined`)
  if (!previous?.fields?.slug) throw Error(`previous.fields.slug is undefined`)

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
          {previous && (
            <Link to={previous.fields?.slug} rel="prev">
              ← {previous.frontmatter?.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields?.slug} rel="next">
              {next.frontmatter?.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default ProjectTemplate

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
`
