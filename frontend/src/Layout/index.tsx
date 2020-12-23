import React from 'react';
import { useLocation } from 'react-router-dom';

import { NavBar } from '../components/NavBar';

// routes definition where Navbar display is enabled
const navBarRoutes = [
    '/', '/campaign'
]

export const Layout = () => {
    const { pathname } = useLocation();

    const canShowNavBar = () => {
        return navBarRoutes.includes(pathname);
    };

    return <>{canShowNavBar() && <NavBar />}</>;
};
