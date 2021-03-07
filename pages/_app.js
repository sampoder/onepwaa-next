import * as React from 'react'
import Head from 'next/head'

import Meta from '../components/meta'
import ColorSwitcher from '../components/color-switcher'
import { ThemeProvider, merge } from 'theme-ui'
import theme from 'theme-ui-preset-geist'

const brandTheme = merge(theme, {
  initialColorModeName: 'dark',
  useColorSchemeMediaQuery: false,
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={brandTheme}>
      <Meta />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
