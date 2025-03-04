import http from "./Base";

export const GetTarefa = async ({ idCompromisso }: { idCompromisso: number }) => {
    return http.get(`/compromisso/${idCompromisso}/tarefa`);
};

export const PostTarefa = async ({ idCompromisso, descricao, status }: { idCompromisso: number, descricao: string, status: number }) => {
    return http.post(`/compromisso/${idCompromisso}/tarefa`, { descricao, status });
}

export const PutTarefa = async ({ id, descricao, status, dataConclusao }: { id: number, descricao: string, status: number, dataConclusao: string }) => {
    return http.put(`/compromisso/tarefa/${id}`, { descricao, status, dataConclusao });
}

export const DeleteTarefa = async ({ id }: { id: number }) => {
    return http.delete(`/compromisso/tarefa/${id}`);
}