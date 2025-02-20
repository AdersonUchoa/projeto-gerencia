import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import CalendaryCreate from "@/pages/Calendary/CalendaryCreate"
import { useEffect, useState } from "react"
import { GetCompromisso } from "@/requests/Compromisso"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function Calendary() {
    const [editModal, setEditModal] = useState<boolean>(false)
    const [compromissos, setCompromissos] = useState([])

    async function loadCompromisso() {
        const data = await GetCompromisso()
        setCompromissos(data.data.response)
    }
    useEffect(() => {
        try {
            loadCompromisso()
        } catch (error) {
            toast({
                title: "Erro ao carregar compromisso",
                description: "Ocorreu um erro ao carregar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }, [])


    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Agenda</h1>
                <p>Organize sua rotina! Aqui você pode visualizar todos os seus compromissos e criar novas tarefas para manter seu dia sempre em ordem.</p>
            </div>
            <CalendaryCreate />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Categorias</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        compromissos.map((item, index) =>
                            <TableRow>
                                <TableCell className="font-medium">{item.titulo}</TableCell>
                                <TableCell className="max-w-10 text-nowrap overflow-hidden text-ellipsis">{item.descricao}</TableCell>
                                <TableCell>{item.datacompromisso}</TableCell>
                                <TableCell>{item.horario}</TableCell>
                                <TableCell>{item.classificacao.map(classificacao => <Badge>{classificacao}</Badge>)}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleEditCrompromisse("ds")}>
                                        <Pencil />Abrir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </section>
    )
}
