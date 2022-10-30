import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./auth";

export const Context = React.createContext({
    location : 'login',
    setLocation : () => undefined,
    userName : '',
    setUserName : () => undefined,
});

const ContextWrapper = ({children}) => {

    const [location, setLocation] = useState('about');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if(isAuthenticated()) setLocation('dashboard');
    }, [])
    
    return (
        <Context.Provider value={{
            location : location,
            setLocation : setLocation,
            userName : userName,
            setUserName : setUserName,
        }}>
            {children}
        </Context.Provider>
    );
} 

export default ContextWrapper;