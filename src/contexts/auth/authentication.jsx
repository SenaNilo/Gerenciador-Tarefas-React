//React context serve para poder passar dados sem precisar usar o props
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    //useEffect - traz mais funcionalidades, normalmente de fora
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
    }, []);

    async function initializeUser(user){
        if(user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value ={ value }>
            {!loading && children}
        </AuthContext.Provider>
    )
}
