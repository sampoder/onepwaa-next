import React, { useState } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import theme from 'theme-ui-preset-geist'
import base from '../lib/base'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { Animated } from 'react-animated-css'

const map1 = base.map(x => ({
  markerOffset: -30,
  name: 'Base Marker',
  coordinates: [x[1], x[0]],
}))

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const markers = [
  {
    markerOffset: -30,
    name: 'Buenos Aires',
    coordinates: [-58.3816, -34.6037],
  },
]

const MapChart = () => {
  const [pwaas, setPwaas] = useState()
  const channel = useChannel('pwaa')
  useEvent(channel, 'incoming', async ({ long, lat }) => {
    alert('Pwaa!')
  })
  return (
    <ComposableMap projection="geoMercator" width={965}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={theme.colors.modes.dark.gray[1]}
              stroke={theme.colors.modes.dark.gray[2]}
            />
          ))
        }
      </Geographies>
      {map1.map(({ name, coordinates, markerOffset }) => (
        <Marker coordinates={coordinates} key={Math.random()}>
          <circle cx="2" cy="2" r="2" fill={theme.colors.success}></circle>
        </Marker>
      ))}
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates} key={Math.random()}>
          <circle cx="2" cy="2" r="30" fill={theme.colors.success}></circle>
          <image
            x="0%"
            y="0%"
            xlinkHref="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
            height="30"
            width="30"
          ></image>
          
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default MapChart
