import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

interface Data {}

const HomePage: React.FC<PageProps<Data>> = ({ data }) => {
  return (
    <Layout location={window.location} title={"home"}>
      <h1>Home</h1>
    </Layout>
  )
}

export default HomePage
