import { Box, Button, Container, Heading, Text } from 'theme-ui'
import MapChart from '../components/map'
import theme from 'theme-ui-preset-geist'
import colours from '../lib/colours'
import names from '../lib/names.json'
import useSound from 'use-sound'
import { useState } from 'react'

function App(props) {
  const [sound, setSound] = useState(false)
  const [pop, { popStop }] = useSound(
    'https://www.joshwcomeau.com/sounds/pop-up-off.mp3',
  )
  return (
    <Box>
      <Box sx={{ maxHeight: '100vh', overflowY: 'hidden' }}>
        <MapChart />
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            maxHeight: '300px',
            width: '340px',
            borderRadius: '8px',
            padding: '24px',
            bg: 'gray.1',
            boxShadow: 'rgba(17, 17, 17, 0.2) 0px 4px 12px;',
          }}
        >
          <Heading as="h1" sx={{ fontWeight: '800', marginBottom: '12px' }}>
            Share{' '}
            <Text
              sx={theme =>
                theme.util.gxText(
                  props.country.colours[0],
                  props.country.colours[1],
                )
              }
            >
              {props.country.full}'s
            </Text>{' '}
            Pwaa-tastic Spirit with the World
          </Heading>
          <Button variant="primary" sx={{ color: 'white' }}>
            <img
              src="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
              style={{ height: '17px', verticalAlign: 'text-bottom' }}
            />{' '}
            Send a Pwaa!
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setSound(!sound)
              if (!sound) {
                pop()
              }
            }}
            sx={{
              minWidth: '10px',
              marginLeft: '8px',
              transition: 'transform 0.35s ease-in-out',
              ':focus': {
                transform: `rotate(${Math.random() > 0.5 ? '6' : '-6'}deg)`,
              },
              ':hover': {
                transform: `rotate(${Math.random() > 0.5 ? '6' : '-6'}deg)`,
              },
            }}
          >
            <Text sx={{ transform: 'rotate(30deg)' }}>
              {sound ? '🔊' : '🔇'}
            </Text>
          </Button>
          <Box sx={{ fontWeight: '400', fontSize: '0.6em', marginTop: '12px' }}>
            Data points displayed on the map is a combination of Pwaas sent and
            OnePwaa's website visits.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export function getServerSideProps(context) {
  const geoip = require('geoip-country')
  const { orderBy, filter } = require('lodash')
  const sortedColours = colours.map(colour => ({
    country:
      names[
        colour['Country']
          .replace(' ', '')
          .normalize('NFD')
          .replace('the', '')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\W/g, '')
          .toLocaleUpperCase()
      ],
    full: colour['Country'],
    colours: colour['Primary colours']
      .replace('and', ',')
      .replace(' ', '')
      .split(','),
  }))
  console.log(sortedColours)
  const ip = context.req.headers['x-forwarded-for']
    ? context.req.headers['x-forwarded-for']
    : '5.53.103.255'
  console.log(geoip.lookup(ip))
  const country = filter(
    sortedColours,
    colour => colour.country === geoip.lookup(ip).country,
  )
  console.log(country)

  return {
    props: { country: country[0] },
  }
}

export default App
