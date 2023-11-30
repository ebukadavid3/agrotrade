import { useState,createContext } from "react";

const AppContext = createContext();

function AppProvider ({children}) {
    const [accountType,setAccountType] = useState('buyer')
    return (
        <AppContext.Provider value={{accountType,setAccountType}}>
            {children}

        </AppContext.Provider>
    )
}
export {AppContext,AppProvider}