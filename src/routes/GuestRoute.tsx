import type { RootState } from "@/store/redux-store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode;
};

export default function GuestRoute({ children }: Props) {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    if (isAuth) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
