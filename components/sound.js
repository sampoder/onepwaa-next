import { Box, Button, Grid, Heading, Text } from 'theme-ui'
import MapChart from './map'
import useSound from 'use-sound'
import { useState } from 'react'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import useWindowSize from '../lib/size'

export default function SoundPanel(props) {
  const size = useWindowSize()
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
  let soundEffect
  if (typeof window != 'undefined') {
    soundEffect = new Audio()
  }

  useEvent(channel, 'incoming', async ({ lat, long }) => {
    if (sound) {
      soundEffect.src =
        'https://cloud-3hdgzu1je-hack-club-bot.vercel.app/0sweet_sounds_of_an_alpaca.hlj.mp3'
      soundEffect.play()
    }

  })
  return (
    <Box
      sx={{
        borderRadius: '8px',
        width: 'calc(100% - 0px)',
        padding: '24px',
        bg: 'gray.1',
        minWidth: size.width < 335 ? '0px' : '335px',
        boxShadow: 'rgba(17, 17, 17, 0.2) 0px 4px 12px;',
        marginTop:
          size.width > 900 ? '0px' : size.width < 500 ? '-32px' : '-96px',
        zIndex: '999',
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
        sx={{
          color: 'white',
          minWidth: size.width < 335 ? '9.5em' : '12.5em',
        }}
        onClick={() => {
          fetch(`/api/send?country=${props.country.country}`)
        }}
      >
        <img
          src="https://cloud-akqarlyq9-hack-club-bot.vercel.app/01p_logo_white.png"
          alt="OnePwaa Logo"
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
          soundEffect.src = ''
          soundEffect.play()
          if (!sound) {
            pop()
          }
        }}
        sx={{
          minWidth: '10px',
          marginLeft: '8px',
          transition: 'transform 0.35s ease-in-out',
        }}
      >
        <Text sx={{ transform: 'rotate(30deg)' }}>{sound ? '🔊' : '🔇'}</Text>
      </Button>
      <Box sx={{ fontWeight: '400', fontSize: '0.6em', marginTop: '12px' }}>
        Data points displayed on the map is a combination of Pwaas sent and
        OnePwaa's website visits.
      </Box>
    </Box>
  )
}
