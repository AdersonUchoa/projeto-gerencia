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
import { PostLogin, PostRegister } from "@/requests/Login";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "@/hooks/use-toast"

export default function Login() {
    const { logged, loginToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const [nome, setNome] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [register, setRegister] = useState<boolean>(false);

    useEffect(() => {
        if (logged) {
            navigate("/")
        }
    }, [logged])

    const handleLoginUser = async () => {
        try {
            const request = await PostLogin({ nome: nome, senha: senha })
            loginToken(request.data.response)
            toast({
                title: "Login efetuado com sucesso",
                description: "Seja bem vindo ao sistema",
                variant: "default",
            })
        } catch (error) {
            toast({
                title: "Erro ao fazer login",
                description: "Ocorreu um erro ao fazer login, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleRegisterUser = async () => {
        try {
            await PostRegister({ nome: nome, senha: senha, email: email })
            const requestLogin = await PostLogin({ nome: nome, senha: senha })
            loginToken(requestLogin.data.response)
            toast({
                title: "Cadastro efetuado com sucesso",
                description: "Seja bem vindo ao sistema",
                variant: "default",
            })
        } catch (error) {
            toast({
                title: "Erro ao fazer cadastro",
                description: "Ocorreu um erro ao fazer cadastro, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleRegister = () => {
        setRegister(!register);
    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-900">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>{register ? "Cadastro" : "Login"}</CardTitle>
                    <CardDescription>{register ? "Faça o cadastro no sistema" : "Faça o login no sistema"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="usuario">Usuário</Label>
                    <Input placeholder="Digite seu usuário" id="usuario" value={nome} onChange={e => setNome(e.target.value)} />
                </CardContent>
                {register &&
                    <CardContent>
                        <Label htmlFor="email">Email</Label>
                        <Input placeholder="Digite seu email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </CardContent>
                }
                <CardContent>
                    <Label htmlFor="senha">Senha</Label>
                    <Input placeholder="Digite sua senha" id="senha" value={senha} onChange={e => setSenha(e.target.value)} />
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col justify-center mx-auto">
                        <Button onClick={() => register ? handleRegisterUser() : handleLoginUser()}>{register ? "Cadastrar" : "Entrar"}</Button>
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
