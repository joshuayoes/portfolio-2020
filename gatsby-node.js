const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async (...args) => {
  await createBlogPages(...args)
  await createProjectPages(...args)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const createBlogPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(`
    query CreateBlogPages {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  if (!result.data) {
    throw Error("createBlogPages data is undefined")
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    if (!post.node.fields.slug) {
      throw Error("post.node.fields.slug is undefined")
    }

    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

const createProjectPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectPost = path.resolve(`./src/templates/project.tsx`)
  const result = await graphql(`
    query CreateProjectPages {
      allMarkdownRemark(
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/projects/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create project pages.
  const projects = result.data.allMarkdownRemark.edges

  projects.forEach((post, index) => {
    const previous =
      index === projects.length - 1 ? null : projects[index + 1].node
    const next = index === 0 ? null : projects[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: projectPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}
