import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const AuthContext = createContext(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState<boolean>(false);

    function loginToken(token: string) {
        if (token) {
            localStorage.setItem("token", token)
            setLogged(true)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setLogged(true)
        }
        if (!logged && !token) {
            navigate("/login")
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("token")
        navigate('/login')
        setLogged(false)
    }

    return (
        <AuthContext.Provider value={{ logged, logout, loginToken }}>
            {children}
        </AuthContext.Provider>
    )
}
