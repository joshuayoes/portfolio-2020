import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Layout: React.FC = ({ children }) => {
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
          <Link to='/'>Home</Link>
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
