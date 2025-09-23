import { Button } from "@/shared/ui/button"
import { LogIn } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate("/login")}>
        <LogIn />
        <span>Login</span>
    </Button>
  )
}

export default LoginButton
