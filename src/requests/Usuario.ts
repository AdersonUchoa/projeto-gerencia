import http from "./Base"

export const GetUsuario = () => {
    return http.get("/usuario")
}

export const PostUsuario = ({ nome, senha }: { nome: string, senha: string }) => {
    return http.post("/usuario", { nome, senha })
}

export const PutUsuario = ({ id, nome, senha }: { id: number, nome: string, senha: string }) => {
    return http.put(`/usuario/${id}`, { nome, senha })
}

export const DeleteUsuario = ({ id }: { id: number }) => {
    return http.delete(`/usuario/${id}`)
}