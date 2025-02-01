import React, { ReactNode } from 'react';
import Header from "../components/header";
import SideBar from '../components/sideBar'; 

const Layout = ({ children, showLayout = true }:any) => {
    if (!showLayout) {
        return <>{children}</>;
    }

    return (
        <div className='layout'>
            <SideBar />
            <div className='body'>
                <Header />  
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
