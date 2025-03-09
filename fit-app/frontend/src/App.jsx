import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar'
import RouterConfig from './config/RouterConfig'
import "./index.css"
import WorkoutForm from './components/WorkoutForm'

function App() {
  return (
    <Container maxWidth="lg" >
      <Box display={"flex"} width={"100%"} >
        <Navbar />
        <RouterConfig sx={{ width: "30%" }} />
        <WorkoutForm sx={{ width: "45%" }} />
      </Box>
    </Container>
  )
}

export default App
