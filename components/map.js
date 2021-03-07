import React from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import theme from 'theme-ui-preset-geist'
import base from '../lib/base'

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
  { markerOffset: 15, name: 'La Paz', coordinates: [-68.1193, -16.4897] },
  { markerOffset: 15, name: 'Brasilia', coordinates: [-47.8825, -15.7942] },
  { markerOffset: 15, name: 'Santiago', coordinates: [-70.6693, -33.4489] },
  { markerOffset: 15, name: 'Bogota', coordinates: [-74.0721, 4.711] },
  { markerOffset: 15, name: 'Quito', coordinates: [-78.4678, -0.1807] },
  { markerOffset: -30, name: 'Georgetown', coordinates: [-58.1551, 6.8013] },
  { markerOffset: -30, name: 'Asuncion', coordinates: [-57.5759, -25.2637] },
  { markerOffset: 15, name: 'Paramaribo', coordinates: [-55.2038, 5.852] },
  { markerOffset: 15, name: 'Montevideo', coordinates: [-56.1645, -34.9011] },
  { markerOffset: 15, name: 'Caracas', coordinates: [-66.9036, 10.4806] },
  { markerOffset: 15, name: 'Lima', coordinates: [-77.0428, -12.0464] },
]

const MapChart = () => {
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
        <Marker key={name} coordinates={coordinates}>
          <circle cx="2" cy="2" r="2" fill={theme.colors.success} />
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default MapChart
