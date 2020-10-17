import React from "react"
import Img, { GatsbyImageFluidProps } from "gatsby-image"
import cn from "classnames"
import style from "./ProjectCard.module.scss"
import AniLink from "gatsby-plugin-transition-link/AniLink"

interface Props {
  fluid: GatsbyImageFluidProps["fluid"]
  alt: string
  className?: string
  to: string
  name: string
  type: string
}

const ProjectCard: React.FC<Props> = ({
  fluid,
  alt,
  className,
  to,
  name,
  type,
}) => {
  return (
    <div className={style.project}>
      <AniLink paintDrip hex={style.primary} to={to} className={cn("portfolio_item", className)}>
        <Img fluid={fluid} alt={alt} />
        <div className="portfolio_item_hover">
          <div className="portfolio-border clearfix">
            <div className="item_info">
              <h5>{name}</h5> <h6>{type}</h6>
            </div>
          </div>
        </div>
      </AniLink>
    </div>
  )
}

export default ProjectCard
