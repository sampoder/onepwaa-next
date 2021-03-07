import visits from '../../lib/visits'
import randomLocation from 'random-location'
import names from '../lib/names.json'
const countries = require('../../lib/countries.json')
const classifyPoint = require('robust-point-in-polygon')
const getCountryISO3 = require('country-iso-2-to-3')

function pointsInCountry(country, interval) {
  const entry = countries.features.find(
    polygon => polygon.properties.ISO_A3 === country,
  )

  if (!entry || !country) throw new Error('Invalid country')

  if (!interval) interval = 0.1

  const type = entry.geometry.type

  const polygon =
    type === 'Polygon'
      ? [entry.geometry.coordinates.shift().map(e => [e[1], e[0]])]
      : [].concat
          .apply([], entry.geometry.coordinates)
          .map(polygon => polygon.map(e => [e[1], e[0]]))

  const points = []

  for (let poly of polygon) {
    const lonMin = Math.min(...poly.map(e => e[0]))
    const lonMax = Math.max(...poly.map(e => e[0]))
    const latMin = Math.min(...poly.map(e => e[1]))
    const latMax = Math.max(...poly.map(e => e[1]))

    for (let i = lonMin; i < lonMax; i += interval) {
      for (let j = latMin; j < latMax; j += interval) {
        if (classifyPoint(poly, [i, j]) < 1) points.push([j, i])
      }
    }
  }

  return points
}

export const fetchVisits = async => {
  let points = []
  const sortedVisits = visits.map(visit => ({
    country: getCountryISO3(
      names[
        visit['Country']
          .replace(' ', '')
          .normalize('NFD')
          .replace('the', '')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\W/g, '')
          .toLocaleUpperCase()
      ],
    ),
    visits: visit['Users'] + visit['New Users'],
  }))

  function returnPointsInCountry(item, index) {
    console.log(item.country)
    points.push(pointsInCountry(item.country, 0.1)[0])
  }

  sortedVisits.forEach(returnPointsInCountry)

  return points
}

export default function handler(req, res) {
  res.send(fetchVisits())
}
