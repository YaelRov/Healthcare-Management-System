FirstPageNav
import { NavLink, Outlet } from 'react-router-dom'

export default function FirstPageNav() {

    return (
        <>
            <nav className='firstPageNav'>
                <NavLink  to="/login">login</NavLink>
            </nav>
            <Outlet />
        </>
    )}