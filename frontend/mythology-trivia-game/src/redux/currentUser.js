import React, { createContext, useState, useEffect, useContext } from 'react';

const CurrentUserContext = createContext();

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};

const CurrentUser = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        console.log('Stored user:', storedUser);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (isTokenExpired(parsedUser.expiresAt)) {
                logout();
            } else {
                setCurrentUser(parsedUser);
                setAutoLogout(parsedUser.expiresAt);
            }
        }
    }, []);

    const login = (user, expiresIn = 7200) => { // 2 hours to match jwt exp.
        const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);
        const userWithExpiration = { ...user, expiresAt: expiresAt.toISOString() };
        setCurrentUser(userWithExpiration);
        localStorage.setItem('currentUser', JSON.stringify(userWithExpiration));
        setAutoLogout(expiresAt);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        window.location.reload();
    };

    const isTokenExpired = (expiresAt) => {
        return new Date() > new Date(expiresAt);
    };

    const setAutoLogout = (expiresAt) => {
        const timeUntilExpire = new Date(expiresAt).getTime() - new Date().getTime();
        setTimeout(logout, timeUntilExpire);
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </CurrentUserContext.Provider>
    )
};

export default CurrentUser;