import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const CurrentUserContext = createContext();

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};

const CurrentUser = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const logout = useCallback(() => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        window.location.reload();
    }, []);

    const setAutoLogout = useCallback((expiresAt) => {
        const timeUntilExpire = new Date(expiresAt).getTime() - new Date().getTime();
        setTimeout(logout, timeUntilExpire);
    }, [logout]);

    const isTokenExpired = (expiresAt) => {
        return new Date() > new Date(expiresAt);
    };

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
    }, [setAutoLogout, logout]);

    const login = (user, expiresIn = 7200) => { // 2 hours to match jwt exp.
        const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);
        const userWithExpiration = { ...user, expiresAt: expiresAt.toISOString() };
        setCurrentUser(userWithExpiration);
        localStorage.setItem('currentUser', JSON.stringify(userWithExpiration));
        setAutoLogout(expiresAt);
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </CurrentUserContext.Provider>
    )
};

export default CurrentUser;