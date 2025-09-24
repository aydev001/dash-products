import { useEffect } from "react"
import { useLocation, useRoutes, useNavigate, matchPath } from "react-router-dom"
import { mainRoutes, modalRoutes } from "./config"
import NotFoundPage from "@/components/not-fount/NotFoundPage"

const AppRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { background?: Location }

  const main = useRoutes(
    [...mainRoutes, { path: "*", element: <NotFoundPage /> }],
    state?.background || location
  )

  const modals = useRoutes(
    [...modalRoutes, { path: "*", element: <NotFoundPage /> }],
    location
  )

  useEffect(() => {
    if (!state?.background) {
      const isModalPath = modalRoutes.some(route =>
        matchPath(route.path as string, location.pathname)
      )
      if (isModalPath) {
        navigate("/dashboard", { replace: true })
      }
    }
  }, [state, location, navigate])


  return (
    <>
      {main}
      {state?.background && modals}
    </>
  )
}

export default AppRouter
