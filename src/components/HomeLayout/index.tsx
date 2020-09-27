import React from "react"
import { Link } from "gatsby"
import style from "./HomeLayout.module.scss"

const HomeLayout: React.FC = ({ children }) => {
  return (
    <>
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
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>
        Joshua Yoes
        {` `}© {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default HomeLayout
