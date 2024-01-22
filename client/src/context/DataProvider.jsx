import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null)

const URL = "http://localhost:8000";


const DataProvider = ({children}) => {
    const [account, setAccount] = useState('')
    useEffect(()=>{
        if(!account) {
            axios.get(`${URL}/verifytoken`).then(({data}) => {
                setAccount(data)
            })
        }
    }, [])
    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider