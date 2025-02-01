import http from "./Base";

export const PostLogin = ({ nome, senha }: { nome: string, senha: string }) => {
    return http.post("/login", { nome, senha })
}

export const PostRegister = ({ nome, senha }: { nome: string, senha: string }) => {
    return http.post("/usuario", { nome, senha })
}