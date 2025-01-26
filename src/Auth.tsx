import { createContext, useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"

export const AuthContext = createContext(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState<boolean>(false);

    const isLogged = () => {
        const token = localStorage.getItem("token")
        return token ? true : false
    }

    useEffect(() => {
        if (!isLogged()) {
            navigate('/login')
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ isLogged, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
