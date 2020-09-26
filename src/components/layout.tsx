import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout = ({ location, title, children }: Props) => {
  return (
    <div
      style={ {
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      } }
    >
      <header>
        <h3>
          <Link to='/'>{title}</Link>
        </h3>
      </header>
      <main>{ children }</main>
      <footer>
        © { new Date().getFullYear() }, Built with
        { ` ` }
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
