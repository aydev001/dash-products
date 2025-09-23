import { useSelector } from "react-redux"
import LoginButton from "./LoginButton"
import type { RootState } from "@/store/redux-store"
import ProfileButton from "./ProfileButton"
import { ShoppingBag } from "lucide-react"

const Header = () => {
    const {isAuth} = useSelector((state: RootState) => state.auth)
    return (
        <div className="shadow-sm border border-neutral-300 bg-white rounded-sm h-[60px] m-[5px] flex justify-between items-center py-[5px] px-[10px]">
            <div className="text-indigo-800 font-semibold flex justify-center items-end gap-1">
                <ShoppingBag />
                <span>ProductHub</span>
            </div>
            {isAuth ?
                <ProfileButton />
                :
                <LoginButton />}
        </div>
    )
}

export default Header
