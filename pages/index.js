import { Box, Button, Container } from 'theme-ui'
import MapChart from '../components/map'

function App() {
  return (
    <Box>
      <Box sx={{ maxHeight: '100vh', overflowY: 'hidden'}}>
        <MapChart />
      </Box>
      This is
      [@lachlanjc/next-theme-starter](https://github.com/lachlanjc/next-theme-starter)
      in action.
      <Button
        variant="success"
        as="a"
        href="https://github.com/lachlanjc/next-theme-starter"
      >
        GitHub
      </Button>
    </Box>
  )
}

export default App
