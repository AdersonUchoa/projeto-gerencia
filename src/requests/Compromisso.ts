import http from "./Base";

export const GetCompromisso = async () => {
	return http.get("/compromisso")
};

export const PostCompromisso = async ({
	titulo,
	descricao,
	dataCompromisso,
	horario,
	classificacao
}: { titulo: string, descricao: string, dataCompromisso: string, horario: string, classificacao: number[] }) => {
	return http.post("/compromisso", { titulo, descricao, dataCompromisso, horario, classificacao })
}

export const PostCompromissoAll = async ({
	titulo,
	descricao,
	dataCompromisso,
	horario,
	classificao,
	tasks,
	notification,
}) => {
	return http.post("/compromissoAll", {
		titulo,
		descricao,
		dataCompromisso,
		horario,
		classificao,
		tasks,
		notification
	})
}

export const PutCompromisso = async ({
	id,
	titulo,
	descricao,
	dataCompromisso,
	horario
}: {
	id: number;
	titulo: string;
	descricao: string;
	dataCompromisso: string;
	horario: string;
}) => {
	return http.put(`/compromisso/${id}`, { titulo, descricao, dataCompromisso, horario })
}

export const DeleteCompromisso = async (id: number) => {
	return http.delete(`/compromisso/${id}`)
}