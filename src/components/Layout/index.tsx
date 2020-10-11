import React from "react"
import { Link } from "gatsby"
import style from "./Layout.module.scss"
import cn from "classnames"
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

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
        <a href="https://www.linkedin.com/in/joshua-yoes/"><FaLinkedin size={44} /></a>
        <a href="https://github.com/joshuayoes"><FaGithub size={44} /></a>
        <a href="https://twitter.com/joshuayoes"><FaTwitter size={44} /></a>
      </footer>
    </div>
  )
}

export default Layout
