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
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export default CurrentUser;