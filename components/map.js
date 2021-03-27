import React, { useState, useEffect } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import theme from 'theme-ui-preset-geist'
import base from '../lib/base'

const map = base.map(x => ({
  markerOffset: -30,
  name: 'Base Marker',
  coordinates: [x[1], x[0]],
}))

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const MapChart = ({ pwaas }) => {
  const size = useWindowSize();
  return (
    <ComposableMap projection="geoMercator" width={100} height={size.width > 1150 ? 45 : 55} style={{ width: '100%' }} projectionConfig={{
      rotate: [0, 0, 0],
      scale: 15,
      center:[20, 8]
    }}>
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
          <circle cx="0.3" cy="0.3" r="0.3" fill={theme.colors.success}></circle>
        </Marker>
      ))}
      {pwaas.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates} key={Math.random()}>
          <circle cx="0.9" cy="0.975" r="1.5" fill={theme.colors.success}></circle>
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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default MapChart
