import { BrowserRouter } from "react-router-dom"
import configureStore from "../config/configureStore"
import Frame from "./components/Frame"
import Main from "./Main"
import { Provider } from "react-redux"
import React, { Component } from "react"
import styled from "styled-components"

const store = configureStore()

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppStyled>
        <Frame>
          <Main />
        </Frame>
      </AppStyled>
    </Provider>
  </BrowserRouter>
)

const AppStyled = styled.div``

export default App
