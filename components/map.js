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

const MapChart = ({ pwaas }) => {
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
      {pwaas.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates} key={Math.random()}>
          <circle cx="6" cy="6.5" r="10" fill={theme.colors.success}>
            <animate
              attributeName="r"
              from="0"
              to="10"
              dur="6s"
              fill="freeze"
            />
          </circle>
          <image
            x="0%"
            y="0%"
            xlinkHref="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
            height="14"
            width="14"
          >
            <animate
              attributeName="height"
              from="0"
              to="14"
              dur="6s"
              fill="freeze"
            />
            <animate
              attributeName="width"
              from="0"
              to="14"
              dur="6s"
              fill="freeze"
            />
          </image>
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default MapChart
