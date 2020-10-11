import React from "react"
import { Link } from "gatsby"
import style from "./Layout.module.scss"
import cn from "classnames"

interface Props {
  className?: string;
}

const Layout: React.FC<Props> = ({ className, children }) => {
  return ( 
    <div className={cn(style.layout, className)}>
      <header className={style.header}>
        <div>
          <h3>
            <Link to="/">Joshua Yoes</Link>
          </h3>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        Joshua Yoes
        {` `}© {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout
