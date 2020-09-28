import React from "react"
import Img, { GatsbyImageFluidProps } from "gatsby-image"

interface Props {
  fluid: GatsbyImageFluidProps["fluid"]
}

const ProjectCard: React.FC<Props> = ({ fluid }) => {
  return <Img fluid={fluid} />
}

export default ProjectCard
