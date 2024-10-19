import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const [serviceData, setServiceData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const authorizationToken = `Bearer ${token}`

    const storeTokenInLS = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken)
    }
    
    let isLoggedIn = !!token
    // console.log("isLoggedIn", !!token, isLoggedIn);
    
    const LogoutUser = () =>{
        setToken("")
        return localStorage.removeItem("token")
    }

    //jwt authentication - to get the current login userData
    const userAuthentication = async()=>{
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method: "GET",
                headers:{
                    'Authorization' : authorizationToken
                },
            })

            if(response.ok){
                const data = await response.json()
                console.log("user data", data.userData);
                setUser(data.userData)
                setIsLoading(false)
            }else{
                setUser("")
                console.error("Error fetching data")
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error fetching data")
        }
    }

    //get services data from db
    const getServicesData = async() =>{
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
                method:"GET",
            })
            // console.log(response);
            if(response.ok){
                const data = await response.json()
                // console.log(data.response);
                setServiceData(data.response)
            }
            
        } catch (error) {
            console.error("Services frontend error: ", error);
            
        }
    }

    useEffect(()=>{
        getServicesData()
        userAuthentication()
    },[])

    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, serviceData, authorizationToken, isLoading, userAuthentication}} > 
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("Auth used outside of the provider");
    }
    return authContextValue
}