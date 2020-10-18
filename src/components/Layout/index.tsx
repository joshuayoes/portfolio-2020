import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import style from "./Layout.module.scss"
import cn from "classnames"
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import throttle from 'lodash/throttle';

interface Props {
  className?: string;
  clearAtTop?: boolean;
}

const Layout: React.FC<Props> = ({ className, children, clearAtTop }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0);
  const isTop = clearAtTop ? scrollY === 0 : false;

  const handleScroll = useCallback(throttle(() => {
    setScrollY(ref.current?.scrollTop!);
  }, 500), []);

  useEffect(() => {
    if (clearAtTop) {
      ref.current?.addEventListener('scroll', handleScroll)
    }
    return function cleanup() {
      if (clearAtTop) {
        ref.current?.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll]);

  return ( 
    <div className={cn(style.layout, { [style.top]: isTop }, className)} ref={ref}>
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
