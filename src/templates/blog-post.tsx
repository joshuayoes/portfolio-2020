import React from "react"
import { graphql, PageProps } from "gatsby"

import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Layout from "../components/Layout"
import style from './styles/blog-post.module.scss';
import { BlogPostBySlugQuery, SitePageContext } from "../../graphql-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import GatsbyImage, { FixedObject, FluidObject } from "gatsby-image";
import EmailSignUp from "../components/EmailSignUp"

const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery, SitePageContext>> = ({ data, pageContext, path }) => {
  const post = data?.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout className={style.layout}>
      <SEO
        title={post?.frontmatter?.title!}
        description={post?.frontmatter?.description ?? post?.excerpt!}
        thumbnail={`${data.site?.siteMetadata?.siteUrl}/${post?.frontmatter?.thumbnail?.publicURL}`}
        type="article"
      />
      <GatsbyImage className={style.image} fluid={post?.frontmatter?.thumbnail?.childImageSharp?.fluid as FluidObject} />
      <article>
        <h1
          style={{
            marginTop: rhythm(1 / 5),
          }}
          >
          {post?.frontmatter?.title!}
        </h1> 
        <ul>
          <li>
            <div>
              <GatsbyImage fixed={data?.avatar?.childImageSharp?.fixed as FixedObject} alt={`${data?.site?.siteMetadata?.author}`} />
              <div>
                <h6>{data?.site?.siteMetadata?.author}</h6>
                <small>{post?.frontmatter?.date!}</small>
              </div>
            </div>
          </li>
          <li><small>{post?.fields?.readingTime?.text}</small></li>
        </ul>
        <div dangerouslySetInnerHTML={{ __html: post?.html! }} />
        <hr style={{ marginBottom: rhythm(1) }}
        />
        <EmailSignUp REFERRAL={`${data.site?.siteMetadata?.siteUrl}${path}`} />
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
        siteUrl
        author
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
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
        thumbnail {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
