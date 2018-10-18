import React, { Component } from "react";
import { ThemeProvider } from 'styled-components';
import Routes from "./routes";
import theme from './theme'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }
}

export default App;
