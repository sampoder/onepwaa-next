import visits from '../../lib/visits'
import randomLocation from 'random-location'
import names from '../../lib/names.json'
const countries = require('../../lib/countries.json')
const classifyPoint = require('robust-point-in-polygon')
const getCountryISO3 = require('country-iso-2-to-3')

export const fetchVisits = async => {
  let points = []
  const sortedVisits = visits.map(visit => ({
    country:
      names[
        visit['Country']
          .replace(' ', '')
          .normalize('NFD')
          .replace('the', '')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\W/g, '')
          .toLocaleUpperCase()
      ],
    visits: visit['Users'] + visit['New Users'],
    real: visit['Country'],
  }))

  async function returnPointsInCountry(item, index) {
    console.log(item.country)
    console.log(item.real)
    try {
      let res = await fetch(
        `https://onepwaa-next-sampoder.vercel.app/api/index?country=${item.country}&number=${item.visits}`,
      ).then(res => res.json())
      points.push(res)
      console.log(res)
    } catch {
      console.log('error')
    }
  }

  sortedVisits.forEach(returnPointsInCountry)

  return points
}

export default async function handler(req, res) {
  let points = []
  const sortedVisits = visits.map(visit => ({
    country:
      names[
        visit['Country']
          .replace(' ', '')
          .normalize('NFD')
          .replace('the', '')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\W/g, '')
          .toLocaleUpperCase()
      ],
    visits: visit['Users'] + visit['New Users'],
    real: visit['Country'],
  }))

  async function returnPointsInCountry(item, index) {
    console.log(item.country)
    console.log(item.real)
    try {
      let res = await fetch(
        `https://onepwaa-next-sampoder.vercel.app/api/index?country=${item.country}&number=${item.visits}`,
      ).then(res => res.json())
      points = points.concat(res)
      console.log(res)
    } catch {
      console.log('error')
    }
  }

  for (const visit of sortedVisits) {
    await returnPointsInCountry(visit)
  }

  res.send(points)
}
