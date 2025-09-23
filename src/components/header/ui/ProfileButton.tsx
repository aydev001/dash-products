import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
} from "@/shared/ui/avatar"
import type { AppDispatch, RootState } from "@/store/redux-store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCurrentUser, logout } from "@/store/auth-slice/authSlice"
import { Home, LayoutDashboard, LogOut } from "lucide-react"

const ProfileButton = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.auth)

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "US"

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                size={"lg"}
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full border p-1 pr-4 hover:bg-neutral-100"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem onClick={() => navigate("/")}>
                    <Home/>
                    <span>Home Page</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard/>
                    <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                        dispatch(logout())
                    }}
                >   
                    <LogOut color="red"/>
                    <span className="text-red-500">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileButton
