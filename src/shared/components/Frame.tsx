import React, { ReactNode } from "react"
import styled from "styled-components"

const Frame = ({ children }: { children?: ReactNode }) => {
  return (
    <FrameStyled>
      <TopBarStyled></TopBarStyled>
      <MainStyled>{children}</MainStyled>
    </FrameStyled>
  )
}

const FrameStyled = styled.div``
const TopBarStyled = styled.div``
const MainStyled = styled.div``

export default Frame
