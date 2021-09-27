import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import HomeList from './screens/HomeList';
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  green: {
    900: "#3B5249",
    800: "#519872",
    500: "#AFD4C0",
    300: "#E5F4EC",
    100: "#8AEA92",
  },
  red: {
    100: "#FEC2C2" 
  },
  grey: {
    100: "#DEDEDE",
  }
}
const theme = extendTheme({ colors })


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HomeList />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
