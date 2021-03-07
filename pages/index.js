import { Box, Button, Container, Heading, Text } from 'theme-ui'
import MapChart from '../components/map'
import theme from 'theme-ui-preset-geist'

function App() {
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
            <Text sx={theme => theme.util.gxText('green', 'gold')}>
              Australia's
            </Text>{' '}
            Pwaa-tastic Spirit with the World
          </Heading>
          <Button
            variant="primary"
            as="a"
            href="https://github.com/lachlanjc/next-theme-starter"
          >
            Send a Pwaa!!
          </Button>
          <Button
            variant="primary"
            as="a"
            sx={{ minWidth: '10px', marginLeft: '8px' }}
            href="https://github.com/lachlanjc/next-theme-starter"
          >
            🔊
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
  var ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress
  console.log(ip)
  return {
    props: { data: 'hi' },
  }
}

export default App
