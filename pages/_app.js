import * as React from 'react'
import Head from 'next/head'

import Meta from '../components/meta'
import ColorSwitcher from '../components/color-switcher'
import { ThemeProvider, merge } from 'theme-ui'
import theme from 'theme-ui-preset-geist'
import { PusherProvider } from '@harelpls/use-pusher'

const config = {
  // required config props
  clientKey: 'd83e73923e8acf7d6d52',
  appId: '1167783',
  cluster: 'ap1',
  useTLS: true,
}

theme.util = {
  motion: '@media (prefers-reduced-motion: no-preference)',
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)',
  supportsClipText: '@supports (-webkit-background-clip: text)',
  supportsBackdrop:
    '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)',
  cx: null,
  gx: null,
  gxText: null,
}
theme.util.cx = c => theme.colors[c] || c
theme.util.gx = (from, to) => `radial-gradient(
  ellipse farthest-corner at top left,
  ${theme.util.cx(from)},
  ${theme.util.cx(to)}
)`
theme.util.gxText = (from, to) => ({
  color: theme.util.cx(to),
  [theme.util.supportsClipText]: {
    backgroundImage: theme.util.gx(from, to),
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})

const brandTheme = merge(theme, {
  initialColorModeName: 'dark',
  useColorSchemeMediaQuery: false,
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={brandTheme}>
      <PusherProvider {...config}>
        <Meta>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          />
        </Meta>
        <Component {...pageProps} />
      </PusherProvider>
    </ThemeProvider>
  )
}

export default App
