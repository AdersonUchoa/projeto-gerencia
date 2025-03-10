import http from "./Base";

export const GetNotificacaoAll = async () => {
    return http.get(`/notificacao`);
}

export const GetNotificacaoId = async ({ id }: { id: number }) => {
    return http.get(`/notificacao/${id}`)
}

export const PostReadAll = async () => {
    return http.post(`/notificao/readAll`);
}

export const PostRead = async ({ id }: { id: number }) => {
    return http.post(`/notificacao/${id}`);
}

export const GetNotificacao = async ({ idCompromisso }: { idCompromisso: number }) => {
    return http.get(`/compromisso/${idCompromisso}/notificacao/`)
};

export const PostNotificacao = async ({ idCompromisso, titulo, descricao, hora }: { idCompromisso: number, titulo: string, descricao: string, hora: string }) => {
    return http.post(`compromisso/${idCompromisso}/notificacao`, { titulo, descricao, hora })
};

export const PostNotificacaoPessoa = async ({ idnotificacao, idusuario }: { idnotificacao: number, idusuario: number }) => {
    const body = { idnotificacao: idnotificacao, idusuario: idusuario }
    return http.post(`notificacao/pessoa`, body)
}
export const PutNotificacao = async ({ id, titulo, descricao, hora, visualizacao }: { id: number, titulo: string, descricao: string, hora: string, visualizacao: boolean }) => {
    return http.put(`compromisso/notificacao/${id}`, { titulo, descricao, hora, visualizacao })
};

export const DeleteNotificacao = async ({ id }: { id: number }) => {
    return http.delete(`compromisso/notificacao/${id}`)
};

export const DeleteNotificaoPessoa = async ({ idnotificacao, idusuario }: { idnotificacao: number, idusuario: number }) => {
    const body = { idnotificacao: idnotificacao, idusuario: idusuario }
    return http.delete(`notificacao/pessoa`, { data: body })
}