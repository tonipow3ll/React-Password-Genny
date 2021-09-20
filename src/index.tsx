import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, responsiveFontSizes, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";


let theme: Theme = createTheme({
  palette: {
    primary: {
      main: `#2c3e50`
    },
    secondary: {
      main: `#34495e`
    },
  },
  typography: {
    fontFamily: 'roboto',
  },
  spacing: 4,
});

theme = responsiveFontSizes(theme);
// theme.palette.primary.main


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
