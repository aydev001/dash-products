import MainProvider from "./providers/MainProvider"
import AppRouter from "./routes/AppRouter"

const App = () => {
  return (
    <MainProvider>
      <AppRouter/>
    </MainProvider>
  )
}

export default App
