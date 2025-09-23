import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { RegisterFormContent } from "./RegisterFormContent"
import { Button } from "@/shared/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { pages } from "@/shared/constants/pages"

const RegisterForm = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-2 w-[400px]">
            <Button onClick={() => navigate(pages.home)} variant={"outline"} className="text-white border bg-white/10 hover:bg-white/20 hover:text-white active:bg-white/10">
                <ArrowLeft/>
                <span>Back to Home</span>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="text-[20px]">Create an account</CardTitle>
                    <CardDescription>
                        Sign up to get started with your product dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterFormContent />
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterForm
