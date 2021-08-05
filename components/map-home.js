import { Box, Button, Grid, Heading, Text } from 'theme-ui'
import MapChart from './map'
import useSound from 'use-sound'
import { useState } from 'react'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import useWindowSize from '../lib/size'
import SoundPanel from './sound'

export default function App(props) {
  props = props.props
  const [pwaas, setPwaas] = useState(props.logs)
  const channel = useChannel('pwaa')
  useEvent(channel, 'incoming', async ({ lat, long }) => {
    setPwaas([{ name: Math.random(), coordinates: [lat, long] }, ...pwaas])
    console.log(pwaas)
  })
  return (
    <Box>
      <Grid
        gap={0}
        columns={ [1, '1fr 3fr']}
        sx={{ alignItems: ' center', px: ['12px', '48px'] }}
      >
        <SoundPanel props={props}/>
        <Box
          sx={{ gridColumnStart: [1, 2], gridRowStart: [1, 1] }}
        >
          <MapChart pwaas={pwaas} />
        </Box>
      </Grid>
    </Box>
  )
}
