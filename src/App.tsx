import { ToastContainer } from "react-toastify"
import MainProvider from "./providers/MainProvider"
import AppRouter from "./routes/AppRouter"

const App = () => {
  return (
    <MainProvider>
      <AppRouter/>
      <ToastContainer/>
    </MainProvider>
  )
}

export default App
