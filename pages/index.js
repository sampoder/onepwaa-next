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

function App(props) {
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
          background: 'rgba(0, 0, 0, 0.74)',
          px: ['12px', '72px'],
          h4: {
            mx: '16px',
            pt: '4px',
            color: '#999',
          },
        }}
      >
        <Heading as="h3" sx={{ pt: '3px', color: '#fff' }}>
          OnePwaa
        </Heading>

        <Box
          sx={{
            textAlign: 'right',
            justifyContent: 'flex-end',
            display: ['none', 'flex'],
          }}
        >
          <Heading as="h4">Knowledge</Heading>
          <Heading as="h4">Strategy</Heading>
          <Heading as="h4">HoWSC</Heading>
          <Heading as="h4">Our Story</Heading>
          <Heading as="h4">Contact</Heading>
        </Box>

        <Heading as="h4" sx={{ display: ['flex', 'none'] }}>
          Contact
        </Heading>
      </Grid>
      <Box sx={{ bg: '#111' }}>
        <MapHome props={props} />
      </Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(
            180deg,
            #111,
            #111
            )`,
          height: ['30px', null, '50px'],
          display: ['block', null, 'none'],
        }}
      ></Box>
      <Box
        sx={{
          width: '100%',
          py: '36px',
          px: ['12px', '72px'],
        }}
      >
        <Heading sx={{ fontWeight: 800 }} as="h1">
          <Text
            as="span"
            sx={{
              borderRadius: 'default',
              px: 2,
              mx: [-2, 0],
              whiteSpace: 'nowrap',
              color: '#fff',
              bg: 'success',
            }}
          >
            Our Content
          </Text>
        </Heading>
        <Box
          mt={3}
          sx={{
            borderRadius: 'default',
            px: 2,
            pt: 1,
            width: 'fit-content',
            color: '#fff',
            bg: 'gray.1',
            display: 'flex',
            flexWrap: 'wrap',
            '> button': {
              mr: 2,
              mb: 1,
            },
          }}
        >
          <Button
            variant="small"
            sx={{ ':hover,:focus': { borderColor: 'violet' } }}
          >
            Knowledge
          </Button>
          <Button variant="small" sx={{ ':hover,:focus': { borderColor: 'purple' } }}>Study Guides</Button>
          <Button variant="small" sx={{ ':hover,:focus': { borderColor: 'alert' } }}>Deep Dives</Button>
          <Button variant="small" sx={{ ':hover,:focus': { borderColor: 'cyan' } }}>Strategy</Button>
          <Button variant="small" sx={{ mr: '0px!important', ':hover,:focus': { borderColor: 'warning' } }}>
            Humans of WSC
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
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
    props: { logs },
    revalidate: 1,
  }
}

export default App
