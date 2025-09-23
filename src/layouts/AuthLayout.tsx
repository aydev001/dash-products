import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='bg-gradient-to-r from-blue-500 to-purple-500 '>
            <Outlet />
        </div>
    )
}

export default AuthLayout
