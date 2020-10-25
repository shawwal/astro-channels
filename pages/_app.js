import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import '../styles/globals.css';
import { themeAtom } from '../src/atoms';
import { RecoilRoot, useRecoilValue } from 'recoil';


const ThemeWrapper = ({ children }) => {
  const themeValue = useRecoilValue(themeAtom);
  const [theme, setTheme] = useState({});
  useEffect(() => {
    let newObject = {
      palette: {
        type: themeValue,
        primary: {
          main: '#E6007D',
        },
        secondary: {
          main: '#19857b',
        },
        error: {
          main: red.A400,
        },
      },
    }
    setTheme(newObject);
  }, [themeValue]);
  const themeConfig = createMuiTheme(theme);
  return (
    <MuiThemeProvider theme={themeConfig}>{children}</MuiThemeProvider>
  )
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <RecoilRoot>
        <Head>
          <title>Astro Channels</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeWrapper>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeWrapper>
      </RecoilRoot>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
