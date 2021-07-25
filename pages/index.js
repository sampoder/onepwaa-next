import {
  Box,
  Button,
  Container,
  Heading,
  Grid,
  Flex,
  Text,
  useColorMode,
} from 'theme-ui'
import MapHome from '../components/map-home'
import colours from '../lib/colours'
import names from '../lib/names.json'
import useWindowSize from '../lib/size'
import ColorSwitcher from '../components/color-switcher'

function App(props) {
  const size = useWindowSize()
  return (
    <Box>
      <Grid
        gap={0}
        columns={[2, '1fr 3fr']}
        sx={{
          position: 'absolute',
          top: '0',
          width: '100%',
          py: '12px',
          background: mode == 'dark' ? 'rgba(0, 0, 0, 0.74)' : '#000',
          px: size.width > 500 ? '72px' : '12px',
          h4: {
            mx: '16px',
            pt: '4px',
            color: mode === 'dark' ? '#999' : '#fff',
          },
        }}
      >
        <Heading as="h3" sx={{ pt: '3px', color: '#fff' }}>
          OnePwaa
        </Heading>
        {size.width > 500 ? (
          <Flex
            sx={{
              textAlign: 'right',
              justifyContent: 'flex-end',
            }}
          >
            <Heading as="h4">Knowledge</Heading>
            <Heading as="h4">Strategy</Heading>
            <Heading as="h4">
              {size.width > 900 ? 'Humans of WSC' : 'HoWSC'}
            </Heading>
            <Heading as="h4">
              {size.width > 900 ? 'Our Story' : 'About'}
            </Heading>
            <Heading as="h4">Contact</Heading>
            <ColorSwitcher />
          </Flex>
        ) : (
          <>
          <Heading as="h4">Contact</Heading>
          </>
        )}
      </Grid>
      <Box sx={{ bg: 'var(--theme-ui-colors-gray-0)' }}>
        <MapHome props={props} />
      </Box>
      {mode === 'dark' ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(
            180deg,
            rgba(0,0, 0, 1),
            #111
            )`,
            height: size.width > 1150 ? '50px' : '30px',
          }}
        ></Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export async function getServerSideProps(context) {
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
  const ip = context.req.headers['x-forwarded-for']
    ? context.req.headers['x-forwarded-for']
    : '1.179.127.254'
  console.log(geoip.lookup(ip))
  const country = filter(
    sortedColours,
    colour => colour.country === geoip.lookup(ip).country,
  )
  console.log(country)

  const AirtablePlus = require('airtable-plus')

  const inst = new AirtablePlus({
    baseID: process.env.base,
    tableName: 'logs',
    apiKey: process.env.airtable,
  })

  const logs = (await inst.read({})).map(({ id, fields }) => ({
    name: Math.random(),
    coordinates: [fields.lat, fields.long],
  }))

  console.log(logs)

  return {
    props: { country: country[0], logs },
  }
}

export default App
