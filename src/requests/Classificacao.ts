import http from "./Base";

export const GetClassificacao = async () => {
    return http.get("/classificacao")
};

export const PostClassificacao = async ({ titulo }: { titulo: string }) => {
    return http.post("/classificacao", { titulo })
}

export const PutClassificacao = async ({ id, titulo }: { id: number, titulo: string }) => {
    return http.put(`/classificacao/${id}`, { titulo })
}

export const DeleteClassificacao = async ({ id }: { id: number }) => {
    return http.delete(`/classificacao/${id}`)
}