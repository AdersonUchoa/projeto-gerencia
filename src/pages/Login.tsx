import { AuthContext } from "@/Auth";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function Login() {
    const { isLogged } = useContext(AuthContext)
    const navigate = useNavigate()

    const [register, setRegister] = useState<boolean>(false);

    const handleRegister = () => {
        setRegister(!register);
    }

    useEffect(() => {
        if (isLogged()) {
            navigate("/")
        }
    }, [])

    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-900">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>{register ? "Cadastro" : "Login"}</CardTitle>
                    <CardDescription>{register ? "Faça o cadastro no sistema" : "Faça o login no sistema"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label>Usuário</Label>
                    <Input placeholder="Digite seu usuário" />
                </CardContent>
                <CardContent>
                    <Label>Senha</Label>
                    <Input placeholder="Digite sua senha" />
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col justify-center mx-auto">
                        <Button>{register ? "Cadastrar" : "Entrar"}</Button>
                        <p>{register ? "Deseja entrar no sistema? " : "Deseja se cadastrar? "}
                            <span
                                className="text-blue-600 underline cursor-pointer"
                                onClick={handleRegister}>
                                {register ? "login" : "cadastro"}
                            </span>
                        </p>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
