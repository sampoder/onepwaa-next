import { Box, Button, Grid, Heading, Text } from 'theme-ui'
import MapChart from './map'
import useSound from 'use-sound'
import { useState } from 'react'
import { useChannel, useEvent } from '@harelpls/use-pusher'

export default function App(props) {
  props = props.props
  const [sound, setSound] = useState(false)
  const [pop, { popStop }] = useSound(
    'https://www.joshwcomeau.com/sounds/pop-up-off.mp3',
  )
  const [pwaa, { pwaaStop }] = useSound(
    'https://cloud-3hdgzu1je-hack-club-bot.vercel.app/0sweet_sounds_of_an_alpaca.hlj.mp3',
  )
  const [pwaas, setPwaas] = useState(props.logs)
  const channel = useChannel('pwaa')
  useEvent(channel, 'incoming', async ({ lat, long }) => {
    if (sound) {
      pwaa()
    }
    setPwaas([{ name: Math.random(), coordinates: [lat, long] }, ...pwaas])
    console.log(pwaas)
  })
  return (
    <Box>
      <Grid
        gap={0}
        columns={[2, '1fr 3fr']}
        sx={{ alignItems: ' center', px: '48px' }}
      >
        <Box
          sx={{
            borderRadius: '8px',
            width: '100%',
            padding: '24px',
            bg: 'gray.1',
            minWidth: '335px',
            boxShadow: 'rgba(17, 17, 17, 0.2) 0px 4px 12px;',
          }}
        >
          <Heading
            as="h1"
            sx={{
              fontWeight: '800',
              fontSize: ['22px', '22px', '22px', '30px'],
              marginBottom: '12px',
            }}
          >
            Welcome to a Global Community of Scholars!
          </Heading>
          <Button
            variant="primary"
            sx={{ color: 'white' }}
            onClick={() => {
              fetch(`/api/send?country=${props.country.country}`)
            }}
          >
            <img
              src="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
              style={{
                height: '17px',
                verticalAlign: 'text-bottom',
                marginRight: '4px',
              }}
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
        <MapChart pwaas={pwaas} />
      </Grid>
    </Box>
  )
}
