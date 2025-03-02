import http from "./Base";

export const GetRelatorio = async ({ dtInicio, dtFim }: { dtInicio: string, dtFim: string }) => {
    return http.get(`/relatorio`, { params: { dtInicio, dtFim } })
};