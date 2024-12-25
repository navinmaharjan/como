'use client'

import { useEffect, useState } from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage';
import ForgotPassword from './ForgotPassword';

const LoginForm = () => {
    const [activePage, setActivePage] = useState(0);

    const handleActivePage = (index) => {
        setActivePage(index);
    };
    useEffect(() => {
        handleActivePage(activePage);
    }, [activePage]);

   
    return (
        <div className="w-full max-w-2xl p-4">
            <div className={`${activePage === 0 ? "flex" : "hidden"
                } w-full flex-col `}>
               <LoginPage handleActivePage={handleActivePage} />
            </div>
            <div className={`${activePage === 1 ? "flex" : "hidden"
                } w-full flex-col `}>
               <SignupPage handleActivePage={handleActivePage} />
            </div>
            <div className={`${activePage === 2 ? "flex" : "hidden"
                } w-full flex-col `}>
               <ForgotPassword handleActivePage={handleActivePage} />
            </div>
        </div>
    )
}

export default LoginForm