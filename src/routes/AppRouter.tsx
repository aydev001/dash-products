import { useLocation, useRoutes } from "react-router-dom"
import { mainRoutes, modalRoutes } from "./config"
import NotFoundPage from "@/components/not-fount/NotFoundPage"

const AppRouter = () => {
  const location = useLocation()
  const state = location.state as { background?: Location }

  const main = useRoutes(
    [...mainRoutes, { path: "*", element: <NotFoundPage /> }],
    state?.background || location
  )

  const modals = useRoutes(
    [...modalRoutes, { path: "*", element: <NotFoundPage /> }],
    location
  )

  return (
    <>
      {main}
      {state?.background && modals}
    </>
  )
}

export default AppRouter
