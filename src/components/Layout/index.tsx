import React from "react"
import style from "./Layout.module.scss"
import cn from "classnames"
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import AniLink from "gatsby-plugin-transition-link/AniLink";

interface Props {
  className?: string;
}

const Layout: React.FC<Props> = ({ className, children }) => {
  return ( 
    <div className={cn(style.layout, className)}>
      <header className={style.header}>
        <div>
          <h3>
            <AniLink to="/" paintDrip hex={style.primary}>Joshua Yoes</AniLink>
          </h3>
          <ul>
            <li>
              <AniLink to="/blog" paintDrip hex={style.primary}>Blog</AniLink>
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
