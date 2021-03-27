import * as React from 'react'
import Head from 'next/head'
import Meta from '../components/meta'
import ColorSwitcher from '../components/color-switcher'
import { ThemeProvider, merge } from 'theme-ui'
import theme from 'theme-ui-preset-geist'
import { PusherProvider } from '@harelpls/use-pusher'

export const darkColors = {
  gray: [
    '#000',
    '#111',
    '#333',
    '#444',
    '#666',
    '#888',
    '#999',
    '#eaeaea',
    '#fafafa',
  ],
  success: '#0070f3',
  successLight: '#3291ff',
  successDark: '#0366d6',
  error: '#e00',
  errorLight: '#ff1a1a',
  errorDark: '#c00',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningDark: '#f49b0b',
}

export const defaultColors = {
  white: '#fff',
  black: '#000',
  gray: [
    '#fff', // 0 index
    '#fafafa',
    '#eaeaea',
    '#999',
    '#888',
    '#666',
    '#444',
    '#333',
    '#111',
  ],
  success: '#0070f3',
  successLight: '#3291ff',
  successDark: '#0366d6',
  error: '#e00',
  errorLight: '#ff1a1a',
  errorDark: '#c00',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningDark: '#f49b0b',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
}

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
  breakpoints: [32, 48, 64, 96, 128].map(w => `${w}em`),
  colors: {
    text: defaultColors.white,
    background: darkColors.gray[1],
    secondary: darkColors.gray[5],
    selection: defaultColors.purple,
    ...darkColors,
  },
  fonts: {
    body:
      'Raleway, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace:
      'ui-monospace, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    sans: '',
  },
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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
        </Meta>
        <Component {...pageProps} />
      </PusherProvider>
      <style>{`
      body {
        background-color: #111!important
      }      
      `}</style>
    </ThemeProvider>
  )
}

export default App
