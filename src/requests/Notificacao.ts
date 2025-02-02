import http from "./Base";

export const GetNotificacao = async ({ idCompromisso } : { idCompromisso: number }) => {
    return http.get(`/compromisso/${idCompromisso}/notificacao/`)
};

export const PostNotificacao = async ({ idCompromisso, titulo, descricao, hora } : { idCompromisso: number, titulo: string, descricao: string, hora: string }) => {
    return http.post(`compromisso/${idCompromisso}/notificacao`, { titulo, descricao, hora})
};

export const PutNotificacao = async ({ id, titulo, descricao, hora, visualizacao } : { id: number, titulo: string, descricao: string, hora: string, visualizacao: boolean }) => {
    return http.put(`compromisso/notificacao/${id}`, {titulo, descricao, hora, visualizacao})
};

export const DeleteNotificacao = async ({ id } : { id: number }) => {
    return http.delete(`compromisso/notificacao/${id}`)
};