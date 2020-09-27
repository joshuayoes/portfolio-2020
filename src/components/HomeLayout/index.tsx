import React from "react"
import { Link } from "gatsby"
import style from "./HomeLayout.module.scss"
import useScrollPosition from "@react-hook/window-scroll"
import cn from "classnames"

const HomeLayout: React.FC = ({ children }) => {
  const scrollY = useScrollPosition(60)
  const isTop = scrollY === 0

  return (
    <>
      <header className={cn(style.header, { [style.top]: isTop })}>
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
