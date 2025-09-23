import Header from '@/components/header/ui/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <div className='mx-[5px]'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
