import React, { useState, useEffect } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import theme from 'theme-ui-preset-geist'
import { IconButton, useColorMode } from 'theme-ui'
import base from '../lib/base'
import useWindowSize from '../lib/size'

const map = base.map(x => ({
  markerOffset: -30,
  name: 'Base Marker',
  coordinates: [x[1], x[0]],
}))

const geoUrl =
  'https://gist.githubusercontent.com/sampoder/261804857f539d5fc36bad0038cdf919/raw/69349a39d5ac6a865646aa8186fab0b282b2292d/no_antartica.json'

const MapChart = ({ pwaas }) => {
  const size = useWindowSize()
  return (
    <ComposableMap
      projection="geoMercator"
      width={100}
      height={size.width > 1150 ? 45 : 65}
      style={{ width: '100%' }}
      projectionConfig={{
        rotate: [0, 0, 0],
        scale: 15,
        center: [size.width > 900 ? 20 : 0, size.width > 1150 ? 8 : 30],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={theme.colors.modes.dark.gray[1]}
              stroke={theme.colors.modes.dark.gray[2]}
              strokeWidth={0.1}
            />
          ))
        }
      </Geographies>
      {map.map(({ name, coordinates, markerOffset }) => (
        <Marker coordinates={coordinates} key={Math.random()}>
          <circle
            cx="0.3"
            cy="0.3"
            r="0.3"
            fill={theme.colors.success}
          ></circle>
        </Marker>
      ))}
      {pwaas.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates} key={Math.random()}>
          <circle
            cx="0.9"
            cy="0.975"
            r="1.5"
            fill={theme.colors.success}
          ></circle>
          <image
            x="0%"
            y="0%"
            xlinkHref="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
            height="2.1"
            width="2.1"
          ></image>
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default MapChart
